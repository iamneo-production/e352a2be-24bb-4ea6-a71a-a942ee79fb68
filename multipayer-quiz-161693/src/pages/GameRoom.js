import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Tooltip,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GameView from '../components/GameView/index';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { setSocketID } from '../store/user';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

const ENDPOINT = 'http://localhost:3002';

let socket;

const GameRoom = () => {
  const { id, mode } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.user);
  let userName = Cookies.get('user');
  userName = userName ? userName.replace(/"/g, '') : null;
  const [users, setUsers] = useState([]);
  const [isSocketJoined, setIsSocketJoined] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [gameStatus, setGameStatus] = useState('pending');
  const [gameState, setGameState] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const isReadyButtonDisabled = mode === 'multi' && users.length > 1;

  useEffect(() => {
    socket = io.connect(ENDPOINT);

    socket.emit('join', { name: name, room: id, email:userName }, ({ error, user }) => {
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
  }, [dispatch, id, name,userName]);

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
              <Tooltip title="Copied!" placement="right-end" open={isCopied}>
                <span />
              </Tooltip>
            </p>
            {!isSocketJoined && <CircularProgress color="primary" />}
            {isSocketJoined && (
              <>
                <Typography variant="h6">Users in room:</Typography>
                {users.length > 0 &&
                  users.map((user) => (
                    <div key={user.id}>
                      <Button
                        variant="outlined"
                        color= 'warning'
                        style={{ marginBottom: '0.5rem' }}
                      >
                        {user.name}
                      </Button>
                      <Button
                        variant="outlined"
                        color={user.isReady ? 'success' : 'warning'}
                        style={{ marginBottom: '0.5rem' }}
                      >
                        {user.isReady ? 'Ready' : 'Pending'}
                      </Button>
                    </div>
                  ))}
                  {mode ==="multi" && <Button
                        variant="outlined"
                        color= 'error'
                        style={{ marginBottom: '0.5rem' }}
                      >
                        Invite Your Friends to join with GAME ID:{id}
                      </Button>}<br></br>
                {gameStatus === 'pending' && (
                  <Button
                    color="secondary"
                    variant="contained"
                    disabled={mode==="single"? isReadyButtonDisabled: !isReadyButtonDisabled}
                    onClick={sendReadyStatus}
                  >
                    {isReady ? 'Waiting for players' : 'Start'}
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
                        navigate('/categories');
                      }}
                    >
                      Play Again
                    </Button>
                  </>
                )}
                <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        navigate('/categories');
                      }}
                    >
                      Go Back
                    </Button>
              </>
            )}
          </Box>
        </Paper>
      </Grid>
    </Container>
  );
};

export default GameRoom;
