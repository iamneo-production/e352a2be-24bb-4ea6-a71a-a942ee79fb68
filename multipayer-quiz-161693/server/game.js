const games = {};

const moment = require("moment");
const { getTriviaQuestions ,findUserByEmail,updateUserdata} = require("./services");
const { shuffle } = require("./helpers");

const createGame = async (id) => {
  let questions = [];
  try {
    const data = await getTriviaQuestions();
    // console.log(data);
    questions = await data.map((question) => {
      const options = [...question.choices];
      shuffle(options);
      const optionObjArray = options.map((opt, index) => {
        return {
          id: index + 1,
          payload: opt,
        };
      });
      return {
        id: question.id,
        payload: question.text,
        answerID: optionObjArray.find(
          (opt) => opt.payload === question.correctChoice
        ).id,
        options: optionObjArray,
      };
    });
    // Parse data
  } catch (err) {
    console.log(err);
    throw new Error(err.message || "Get trivia questions failed in game.js");
  }

  games[id] = {
    status: "pending",
    players: [],
    questionRoundStatus: "not-started",
    currentQuestionNo: 1,
    questions: questions,
  };
};

const addPlayer = ({ id, name, room ,email}) => {
  console.log(email+"in addplayer");
  if (games[room] !== undefined) {
    games[room].players.push({
      id,
      name,
      isReady: false,
      answers: {},
      score: 0,
      Email:email
    });
  }
  return { error: "Game not found" };
};

const disconnectPlayer = ({ id, room }) => {
  if (games[room] !== undefined) {
    const newPlayerList = [...games[room].players];
    const existingPlayer = games[room].players.findIndex(
      (player) => player.id === id
    );
    if (existingPlayer !== -1) {
      newPlayerList.splice(existingPlayer, 1);
      games[room].players = newPlayerList;
    }
    return { error: "Player not found" };
  }
  return { error: "Game not found" };
};

// Game loop that controls the flow & updating of game state
const gameLoop = async (
  { room },
  updateLeaderboardEmitter,
  updateGameStateEmitter
) => {
  const roundStartTransitionDuration = 5000; // in milliseconds
  const roundEndTransitionDuration = 500; // in milliseconds
  const roundDuration = 10000; // in milliseconds
  let currentQuestion = games[room].currentQuestionNo;
  const questions = shuffle(games[room].questions);
  updateGameStatus(room, "started");

  while (currentQuestion <= games[room].questions.length) {
    updateQuestionRoundStatus(room, "pending");
    games[room].duration = roundStartTransitionDuration;
    updateGameStateEmitter(games[room], room);
    await new Promise((resolve) =>
      setTimeout(resolve, roundStartTransitionDuration)
    );
    updateQuestionRoundStatus(room, "started");
    // TODO: Socket Emit event to update game state, sending game status & question and options
    games[room].duration = roundDuration;
    const momentRoundStarted = moment().format();
    updateGameStateEmitter(games[room], room);

    await new Promise((resolve) => setTimeout(resolve, roundDuration));
    updateQuestionRoundStatus(room, "ended");
    // Update player scores
    const newPlayersList = [...games[room].players];
    games[room].players = newPlayersList.map((player) => {
      const currentQuestionID = questions[currentQuestion - 1].id;
      const playerAnswer = player.answers[currentQuestionID];
      if (playerAnswer !== undefined) {
        if (playerAnswer.answerID === questions[currentQuestion - 1].answerID) {
          // Score Calculation
          const maxPoints = 1000;
          const responseTime = moment(playerAnswer.answeredAt).diff(
            moment(momentRoundStarted),
            "seconds"
          );
          const responseRatio = responseTime / (roundDuration / 1000);
          const score = (1 - responseRatio / 2) * maxPoints;
          return {
            ...player,
            score: player.score + Math.round(score),
          };
        }
      }
      return player;
    });
    updateLeaderboardEmitter(games[room].players, room);
    // TODO: Socket Emit event to update game state, sending game status, correct answer & updated leaderboard
    games[room].duration = roundEndTransitionDuration;
    updateGameStateEmitter(games[room], room);
    await new Promise((resolve) =>
      setTimeout(resolve, roundEndTransitionDuration)
    );

    // if (currentQuestion < games[room].questions.length) {
    //   updateQuestionRoundStatus(room, "pending");
    //   // TODO: Socket Emit event to update game state
    //   updateGameStateEmitter(games[room], room);
    // }
    currentQuestion += 1;
    games[room].currentQuestionNo = currentQuestion;
  }
  
  updateGameStatus(room, "ended");
  // TODO: Socket Emit event to update game state
  updateGameStateEmitter(games[room], room);
  // console.log(games[room].players);
  updateStats(games[room]);

  // TODO: Remove game room since game has ended

  delete games[room];
};



const updateStats = async(game) => {
  if (Array.isArray(game.players) && game.players.length > 0) {
    const sortedPlayers = game.players.slice().sort((a, b) => b.score - a.score);
    // console.log(sortedPlayers);
     const users = await Promise.all(sortedPlayers.map(async (player) => {
      const user = await findUserByEmail(player.Email);
      // console.log(`Original score for ${user.email}: ${user.score}`);
      return user;
    }));

    // console.log(users);
    if(users.length === 1){
      const player = users[0];
      player.gamesplayed += 1;
      player.score += sortedPlayers[0].score;
      //console.log(users);
       const updateduser = await updateUserdata(users[0].id, users[0]);
      console.log(updateduser);
    }
    else if(users.length >1){
      const winner = users[0];
      for(let i =0; i<users.length; i++){
        users[i].gamesplayed +=1;
        users[i].score += sortedPlayers[i].score;
        if(users[i] === winner){
          users[i].gamesWon +=1;
        }else{
          users[i].gamesLost+=1;
        }

      const updateduser = await updateUserdata(users[i].id, users[i]);
      console.log(updateduser);
      }
    //console.log(users);
    // users.forEach(async(user)=> await postDataToServer(user.id, user))
    }else {
    console.log('Not enough players to update stats.');
  }

    // Now, sortedPlayers contains players sorted by score in descending order
  } else {
    console.log('No players to sort.');
  }
}


const updateGameStatus = (room, newStatus) => {
  if (games[room] !== undefined) {
    games[room].status = newStatus;
  }
};

const updateQuestionRoundStatus = (room, newQuestionRoundStatus) => {
  if (games[room] !== undefined) {
    games[room].questionRoundStatus = newQuestionRoundStatus;
  }
};

const updatePlayerReadyStatus = ({ id, name, room }) => {
  if (games[room] !== undefined) {
    const newPlayersList = [...games[room].players];
    const existingUser = newPlayersList.findIndex((user) => user.id === id);
    if (existingUser !== -1) {
      newPlayersList[existingUser] = {
        ...newPlayersList[existingUser],
        isReady: true,
      };
      games[room].players = newPlayersList;
      // Check if all players in game room are ready
      const notReadyUser = games[room].players.find(
        (user) => user.isReady === false
      );
      if (notReadyUser === undefined) {
        // Set game status to started
        updateGameStatus(room, "started");
        updateQuestionRoundStatus(room, "pending");
      }
      return { game: games[room] };
    }
    return { error: "Player id not found" };
  }
  return { error: "Game not found" };
};

const updatePlayerAnswer = ({
  id,
  name,
  room,
  questionID,
  answerID,
  momentAnswered,
}) => {
  // TODO: Add validation for questionID to check if answer submitted is for current question
  if (games[room] !== undefined) {
    const newPlayersList = [...games[room].players];
    const existingUser = newPlayersList.findIndex((user) => user.id === id);
    if (existingUser !== -1) {
      newPlayersList[existingUser].answers[questionID] = {
        answerID,
        answeredAt: momentAnswered,
      };
      games[room].players = newPlayersList;
      return { game: games[room] };
    }
    return { error: "Player id not found" };
  }
  return { error: "Game not found" };
};

const getGameByID = (id) => {
  if (games[id] !== undefined) {
    return { game: games[id] };
  }
  return { error: "Game not found" };
};

const removeEndedGame = () => {};

module.exports = {
  createGame,
  addPlayer,
  disconnectPlayer,
  updatePlayerReadyStatus,
  updatePlayerAnswer,
  getGameByID,
  gameLoop,
};
