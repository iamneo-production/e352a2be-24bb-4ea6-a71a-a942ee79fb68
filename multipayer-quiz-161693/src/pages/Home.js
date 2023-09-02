
import React, { useState } from 'react';
import { Container, Paper, Tabs, Tab, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setName } from '../store/user';
import { generate } from 'random-words';
import { useParams } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const gamemode = useParams("mode");
 

  // Event Handlers
  const createGameHandler = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    dispatch(setName(name));
    const randomRoomID = generate(1).join('-');
    navigate(`/room/${randomRoomID}`);
  };

  const joinGameHandler = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const gameID = event.target.gameID.value;
    dispatch(setName(name));
    navigate(`/room/${gameID}`);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <Typography variant="h5" component="h2" align="center">
          Multiplayer Trivia
        </Typography>
         <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} variant="fullWidth">
          <Tab label="New Game" />
          {gamemode.mode === 'multi' && <Tab label="Join Game" />}
        </Tabs>
        <div hidden={activeTab !== 0}>
          <form onSubmit={createGameHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem' }}
            >
              Create
            </Button>
          </form>
        </div>
        <div hidden={activeTab !== 1}>
          <form onSubmit={joinGameHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="gameID"
              label="Game ID"
              name="gameID"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem' }}
            >
              Join
            </Button>
          </form>
        </div>
      </Paper>
    </Container>
  );
};

export default Home;
