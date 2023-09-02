const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const cors = require('cors');
const moment = require("moment");
const { addUser, removeUser, getUsersInRoom } = require("./users");
const {
  createGame,
  addPlayer,
  disconnectPlayer,
  updatePlayerReadyStatus,
  updatePlayerAnswer,
  getGameByID,
  gameLoop,
} = require("./game");
const router = require("./router");

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true, // Enable cookies and session headers
  }));

  app.use(router);


const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (if needed)
// app.use(express.static('public'));


// JSON Server API base URL
const jsonServerBaseUrl = 'http://localhost:8080';

// Socket.IO logic
io.engine.on("initial_headers", (headers, req) => {
    headers["Access-Control-Allow-Origin"] = "http://localhost:3000";
  });
  
  io.engine.on("headers", (headers, req) => {
    headers["Access-Control-Allow-Origin"] = "http://localhost:3000"; // url to all
  });

// Socker Emitters
const updateLeaderboard = (data, room) => {
  io.to(room).emit("updateLeaderboard", {
    leaderboard: data,
  });
};
const updateGameState = (gameState, room) => {
  io.to(room).emit("updateGameState", {
    gameState,
  });
};


io.on('connect', (socket) => {
  console.log(`A user connected:${socket.id}`);

   // Join room handler
   socket.on("join", async ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback({ error: error });

    socket.join(user.room);
    const { game, error: getGameError } = getGameByID(room);
    if (getGameError) {
      await createGame(room);
      addPlayer({ id: socket.id, name, room });
    } else {
      if (game.status !== "pending") {
        return callback({ error: "Game already started" });
      }
      addPlayer({ id: socket.id, name, room });
    }

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getGameByID(user.room).game.players,
    });

    callback({
      user: user,
    });
  });

  // Set player ready status handler
  socket.on("player-ready", ({ name, room }, callback) => {
    const { game, error } = updatePlayerReadyStatus({
      id: socket.id,
      name,
      room,
    });

    io.to(room).emit("roomData", {
      room,
      users: getGameByID(room).game.players,
    });

    if (game.status === "started") {
      gameLoop({ room }, updateLeaderboard, updateGameState);
    }
    callback({ game, error });
  });

   // Set player's answer
   socket.on(
    "player-answer",
    ({ name, room, questionID, answerID }, callback) => {
      const { game, error } = updatePlayerAnswer({
        id: socket.id,
        name,
        room,
        questionID,
        answerID,
        momentAnswered: moment().format(),
      });
      callback({ game, error });
    }
  );

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected.`);
    const user = removeUser(socket.id);

    if (user) {
      const { error } = disconnectPlayer({ id: socket.id, room: user.room });
      if (error !== "Game not found") {
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getGameByID(user.room).game.players,
        });
      }
    }
  });


 
});

// Start the Socket.IO server
server.listen(process.env.PORT || 3002, () =>
  console.log(`Server has started.`)
);
