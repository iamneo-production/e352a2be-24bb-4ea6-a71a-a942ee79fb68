// import { Heading, HStack,Grid,GridItem,Box } from "@chakra-ui/react";
// import Option from "../Question/Option";
// import QuestionTransition from "../Question/QuestionTransition";
// import { parseEntities } from "../Question/Option";
// import Timer from "../Question/Timer";
// import LeaderboardTable from "./LeaderboardTable";
// import { useSelector } from "react-redux";

// const getCurrentUserAnswer = (
//   currentUserSocketID,
//   playersList,
//   currentQnID,
//   currentQnNo,
//   questionsList
// ) => {
//   const currentPlayer = playersList.find(
//     (player) => player.id === currentUserSocketID
//   );
//   if (currentPlayer === undefined) {
//     return "";
//   } else {
//     const playerAnswer = currentPlayer.answers[currentQnID];
//     if (playerAnswer === undefined) {
//       return "No answer submitted";
//     } else {
//       const playerAnsweredOption = questionsList[currentQnNo - 1].options.find(
//         (option) => option.id === playerAnswer.answerID
//       );
//       if (playerAnsweredOption === undefined) {
//         return "";
//       } else {
//         return playerAnsweredOption.payload;
//       }
//     }
//   }
// };

// const GameView = ({ selectedAnswer, selectOption, gameState, leaderboard }) => {
//   const { socketID } = useSelector((state) => state.user);

//   const questionRoundStatus = gameState.questionRoundStatus;
//   return (
//     <Box p={4}>
//     <Grid
//   templateAreas={`"header header"
//                   "nav main"
//                   "nav main"`}
//   gridTemplateRows={{ base: "auto 1fr 50px", md: "100px 1fr 50px" }}
//   gridTemplateColumns={{ base: "1fr", md: "300px 1fr" }}
//   h={1}
//   gap={10}
  
//   fontWeight='bold'
// >
//     <GridItem pl={2}  area={'header'}></GridItem>
//     <GridItem pl={2}  area={'nav'}>
//           <Heading size="sm" textAlign="center">
//                   Leaderboard
//                 </Heading>
//                 <LeaderboardTable data={leaderboard} />
//     </GridItem>
//     <GridItem pl={2}  area={'main'}>
    
 
//       {questionRoundStatus === "pending" && (
//         <QuestionTransition
//           questionNo={gameState.currentQuestionNo}
//           duration={gameState.duration}
//         />
//       )}
//       {questionRoundStatus === "started" && (
//         <>
//           <Timer duration={gameState.duration} />
//           <Heading>Qn {gameState.currentQuestionNo}</Heading>
//           <Heading>
//             {parseEntities(
//               gameState.questions[gameState.currentQuestionNo - 1].payload
//             )}
//           </Heading>
//           <br></br>
//           <HStack spacing="1rem">
//             {gameState.questions[gameState.currentQuestionNo - 1].options.map(
//               (option, index) => (
//                 <Option
//                   key={option.id}
//                   index={index}
//                   content={option.payload}
//                   onClickHandler={() => {
//                     if (selectedAnswer !== null) return;
//                     selectOption({ answerID: option.id });
//                   }}
//                   isSelected={option.id === selectedAnswer}
//                 />
//               )
//             )}
//           </HStack>
//         </>
//       )}
//       {questionRoundStatus === "ended" && (
//         <div>
//           <Heading size="md">
//             Your Answer:{" "}
//             {gameState.currentQuestionNo <= gameState.questions.length &&
//               parseEntities(
//                 getCurrentUserAnswer(
//                   socketID,
//                   gameState.players,
//                   gameState.questions[gameState.currentQuestionNo - 1].id,
//                   gameState.currentQuestionNo,
//                   gameState.questions
//                 )
//               )}
//           </Heading>
//           <Heading size="md" mb="1rem">
//             Correct Answer:{" "}
//             {gameState.currentQuestionNo <= gameState.questions.length &&
//               parseEntities(
//                 gameState.questions[
//                   gameState.currentQuestionNo - 1
//                 ].options.find(
//                   (option) =>
//                     option.id ===
//                     gameState.questions[gameState.currentQuestionNo - 1]
//                       .answerID
//                 ).payload
//               )}
//           </Heading>
         
//         </div>
//       )}
//        </GridItem>

//       </Grid>
       
//       </Box>
//   );
// };

// export default GameView;


import React from 'react';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import Option from '../Question/Option';
import QuestionTransition from '../Question/QuestionTransition';
import { parseEntities } from '../Question/Option';
import Timer from '../Question/Timer';
import LeaderboardTable from './LeaderboardTable';
import { useSelector } from 'react-redux';

const getCurrentUserAnswer = (
  currentUserSocketID,
  playersList,
  currentQnID,
  currentQnNo,
  questionsList
) => {
  const currentPlayer = playersList.find(
    (player) => player.id === currentUserSocketID
  );
  if (currentPlayer === undefined) {
    return '';
  } else {
    const playerAnswer = currentPlayer.answers[currentQnID];
    if (playerAnswer === undefined) {
      return 'No answer submitted';
    } else {
      const playerAnsweredOption =
        questionsList[currentQnNo - 1].options.find(
          (option) => option.id === playerAnswer.answerID
        );
      if (playerAnsweredOption === undefined) {
        return '';
      } else {
        return playerAnsweredOption.payload;
      }
    }
  }
};

const GameView = ({ selectedAnswer, selectOption, gameState, leaderboard }) => {
  const { socketID } = useSelector((state) => state.user);

  const questionRoundStatus = gameState.questionRoundStatus;
  return (
    <Box p={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" align="center">
            Leaderboard
          </Typography>
          <LeaderboardTable data={leaderboard} />
        </Grid>
        <Grid item xs={12} md={9}>
          {questionRoundStatus === 'pending' && (
            <QuestionTransition
              questionNo={gameState.currentQuestionNo}
              duration={gameState.duration}
            />
          )}
          {questionRoundStatus === 'started' && (
            <>
              <Timer duration={gameState.duration} />
              <Typography variant="h4">Qn {gameState.currentQuestionNo}</Typography>
              <Typography variant="h6">
                {parseEntities(
                  gameState.questions[gameState.currentQuestionNo - 1].payload
                )}
              </Typography>
              <br />
              <Box display="flex" justifyContent="space-between">
                {gameState.questions[gameState.currentQuestionNo - 1].options.map(
                  (option, index) => (
                    <Option
                      key={option.id}
                      index={index}
                      content={option.payload}
                      onClickHandler={() => {
                        if (selectedAnswer !== null) return;
                        selectOption({ answerID: option.id });
                      }}
                      isSelected={option.id === selectedAnswer}
                    />
                  )
                )}
              </Box>
            </>
          )}
          {questionRoundStatus === 'ended' && (
            <div>
              <Typography variant="h6">
                Your Answer:{' '}
                {gameState.currentQuestionNo <= gameState.questions.length &&
                  parseEntities(
                    getCurrentUserAnswer(
                      socketID,
                      gameState.players,
                      gameState.questions[gameState.currentQuestionNo - 1].id,
                      gameState.currentQuestionNo,
                      gameState.questions
                    )
                  )}
              </Typography>
              <Typography variant="h6" mb="1rem">
                Correct Answer:{' '}
                {gameState.currentQuestionNo <= gameState.questions.length &&
                  parseEntities(
                    gameState.questions[
                      gameState.currentQuestionNo - 1
                    ].options.find(
                      (option) =>
                        option.id ===
                        gameState.questions[gameState.currentQuestionNo - 1]
                          .answerID
                    ).payload
                  )}
              </Typography>
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default GameView;
