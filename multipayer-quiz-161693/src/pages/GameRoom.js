// import {
//   Heading,
//   Box,
//   VStack,
//   Button,
//   Badge,
//   Tooltip,
//   Spinner,
// } from "@chakra-ui/react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import io from "socket.io-client";
// import { useSelector, useDispatch } from "react-redux";
// import GameView from "../components/GameView/index";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { setSocketID } from "../store/user";

// const ENDPOINT = "http://localhost:3002";

// let socket;

// const GameRoom = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { name } = useSelector((state) => state.user);
//   const [users, setUsers] = useState([]);
//   const [isSocketJoined, setIsSocketJoined] = useState(false);
//   const [isReady, setIsReady] = useState(false);
//   const [gameStatus, setGameStatus] = useState("pending");
//   const [gameState, setGameState] = useState(null);
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [isCopied, setIsCopied] = useState(false);

//   useEffect(() => {
//     socket = io.connect(ENDPOINT);

//     socket.emit("join", { name: name, room: id }, ({ error, user }) => {
//       if (error) {
//         alert(error);
//       } else {
//         dispatch(setSocketID(user.id));
//         setIsSocketJoined(true);
//       }
//     });
//     return () => {
//       socket.disconnect();
//     };
//   }, [dispatch, id, name]);

//   useEffect(() => {
//     socket.on("roomData", ({ users }) => {
//       setUsers(users);
//     });
//     socket.on("updateGameState", ({ gameState }) => {
//       setGameState(gameState);
//       setGameStatus(gameState.status);
//       setSelectedAnswer(null);
//     });
//     socket.on("updateLeaderboard", ({ leaderboard }) => {
//       setLeaderboard(leaderboard);
//     });
//   }, []);

//   // Event Handlers
//   const sendReadyStatus = () => {
//     socket.emit(
//       "player-ready",
//       { name: name, room: id },
//       ({ games, error }) => {
//         if (error === undefined) {
//           setIsReady(true);
//         }
//       }
//     );
//   };
//   const selectOption = ({ answerID }) => {
//     setSelectedAnswer(answerID);
//     socket.emit(
//       "player-answer",
//       {
//         name: name,
//         room: id,
//         questionID: gameState.questions[gameState.currentQuestionNo - 1].id,
//         answerID,
//       },
//       ({ error }) => {
//         if (error !== undefined) {
//           alert(error);
//         }
//       }
//     );
//   };

//   return (
//     <Box bg="#151515" minH="150vh">
//       <VStack spacing="1rem" color="white">
//         <Heading color="#5582ac">Game Room</Heading>
//         <p>
//           Game ID:{" "}
//           <CopyToClipboard
//             text={id}
//             onCopy={() => {
//               setIsCopied(true);
//               setTimeout(() => {
//                 setIsCopied(false);
//               }, 1000);
//             }}
//           >
//             <Button colorScheme="teal" variant="outline">
//               {id}
//             </Button>
//           </CopyToClipboard>
//           <Tooltip label="Copied!" placement="right-end" isOpen={isCopied}>
//             <span />
//           </Tooltip>
//         </p>
//         {!isSocketJoined && (
//           <Spinner
//             thickness="4px"
//             speed="0.65s"
//             emptyColor="gray.200"
//             color="blue.500"
//             size="xl"
//           />
//         )}
//         {isSocketJoined && (
//           <>
//             <p>Users in room:</p>
//             {users.length > 0 &&
//               users.map((user) => (
//                 <p key={user.id}>
//                   {user.name}{" "}
//                   <Badge ml="1" colorScheme={user.isReady ? "green" : "orange"}>
//                     {user.isReady ? "Ready" : "Pending"}
//                   </Badge>
//                 </p>
//               ))}
//             {gameStatus === "pending" && (
//               <Button
//                 colorScheme="yellow"
//                 variant="solid"
//                 disabled={isReady}
//                 onClick={sendReadyStatus}
//               >
//                 {isReady ? "Waiting for players" : "Ready"}
//               </Button>
//             )}
//             {gameStatus === "started" && (
//               <GameView
//                 selectedAnswer={selectedAnswer}
//                 selectOption={selectOption}
//                 gameState={gameState}
//                 leaderboard={leaderboard}
//               />
//             )}
//             {gameStatus === "ended" && (
//               <>
//                 <Heading size="md">Game Ended</Heading>
//                 <Button
//                   colorScheme="yellow"
//                   variant="solid"
//                   onClick={() => {
//                     navigate("/");
//                   }}
//                 >
//                   Play Again
//                 </Button>
//               </>
//             )}
//           </>
//         )}
//       </VStack>
//    </Box>
//   );
// };
// export default GameRoom;


import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Tooltip,
  Typography,
  Badge,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GameView from '../components/GameView/index';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { setSocketID } from '../store/user';
import io from "socket.io-client";

const ENDPOINT = 'http://localhost:3002';

let socket;

const GameRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [isSocketJoined, setIsSocketJoined] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [gameStatus, setGameStatus] = useState('pending');
  const [gameState, setGameState] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    socket = io.connect(ENDPOINT);

    socket.emit('join', { name: name, room: id }, ({ error, user }) => {
      if (error) {
        alert(error);
      } else {
        dispatch(setSocketID(user.id));
        setIsSocketJoined(true);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch, id, name]);

  useEffect(() => {
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
    socket.on('updateGameState', ({ gameState }) => {
      setGameState(gameState);
      setGameStatus(gameState.status);
      setSelectedAnswer(null);
    });
    socket.on('updateLeaderboard', ({ leaderboard }) => {
      setLeaderboard(leaderboard);
    });
  }, []);

  // Event Handlers
  const sendReadyStatus = () => {
    socket.emit('player-ready', { name: name, room: id }, ({ games, error }) => {
      if (error === undefined) {
        setIsReady(true);
      }
    });
  };
  const selectOption = ({ answerID }) => {
    setSelectedAnswer(answerID);
    socket.emit(
      'player-answer',
      {
        name: name,
        room: id,
        questionID: gameState.questions[gameState.currentQuestionNo - 1].id,
        answerID,
      },
      ({ error }) => {
        if (error !== undefined) {
          alert(error);
        }
      }
    );
  };

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Paper elevation={3} style={{ padding: '2rem' }}>
          <Box>
            <Typography variant="h4">Game Room</Typography>
            <p>
              Game ID:{' '}
              <CopyToClipboard
                text={id}
                onCopy={() => {
                  setIsCopied(true);
                  setTimeout(() => {
                    setIsCopied(false);
                  }, 1000);
                }}
              >
                <Button color="primary" variant="outlined">
                  {id}
                </Button>
              </CopyToClipboard>
              <Tooltip label="Copied!" placement="right-end" open={isCopied}>
                <span />
              </Tooltip>
            </p>
            {!isSocketJoined && (
              <CircularProgress color="primary" />
            )}
            {isSocketJoined && (
              <>
                <p>Users in room:</p>
                {users.length > 0 &&
                  users.map((user) => (
                    <p key={user.id}>
                      {user.name}{' '}
                      <Badge
                        color={
                          user.isReady ? 'success' : 'warning'
                        }
                      >
                        {user.isReady ? 'Ready' : 'Pending'}
                      </Badge>
                    </p>
                  ))}
                {gameStatus === 'pending' && (
                  <Button
                    color="secondary"
                    variant="contained"
                    disabled={isReady}
                    onClick={sendReadyStatus}
                  >
                    {isReady ? 'Waiting for players' : 'Ready'}
                  </Button>
                )}
                {gameStatus === 'started' && (
                  <GameView
                    selectedAnswer={selectedAnswer}
                    selectOption={selectOption}
                    gameState={gameState}
                    leaderboard={leaderboard}
                  />
                )}
                {gameStatus === 'ended' && (
                  <>
                    <Typography variant="h5">Game Ended</Typography>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        navigate('/');
                      }}
                    >
                      Play Again
                    </Button>
                  </>
                )}
              </>
            )}
          </Box>
        </Paper>
      </Grid>
    </Container>
  );
};

export default GameRoom;
