// import {
//   Heading,
//   Center,
//   Button,
//   VStack,
//   FormControl,
//   FormLabel,
//   Input,
//   Tabs,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setName } from "../store/user";
// import { generate } from "random-words";
// import '@chakra-ui/css-reset';

// const Home = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Event Handlers
//   const createGameHandler = (event) => {
//     event.preventDefault();
//     const name = event.target.name.value;
//     dispatch(setName(name));
//     const randomRoomID = generate(1).join("-");
//     navigate(`/room/${randomRoomID}`);
//   };

//   const joinGameHandler = (event) => {
//     event.preventDefault();
//     const name = event.target.name.value;
//     const gameID = event.target.gameID.value;
//     dispatch(setName(name));
//     navigate(`/room/${gameID}`);
//   };
//   return (
//     <Center bg="#151515" minH="100vh">
//       <VStack spacing="1rem">
//         <Heading color="#5582ac">Multiplayer Trivia</Heading>
//         <Tabs variant="soft-rounded" colorScheme="yellow">
//           <TabList>
//             <Tab>New Game</Tab>
//             <Tab>Join Game</Tab>
//           </TabList>
//           <TabPanels>
//             <TabPanel>
//               <form onSubmit={createGameHandler}>
//                 <FormControl id="name" isRequired name="name">
//                   <FormLabel color="#5582ac">Your name</FormLabel>
//                   <Input color="#5582ac" />
//                 </FormControl>
//                 <Button
//                   mt="1rem"
//                   colorScheme="yellow"
//                   variant="solid"
//                   type="submit"
//                 >
//                   Create
//                 </Button>
//               </form>
//             </TabPanel>
//             <TabPanel>
//               <form onSubmit={joinGameHandler}>
//                 <FormControl id="gameID" isRequired name="gameID">
//                   <FormLabel color="#5582ac">Game ID</FormLabel>
//                   <Input color="#5582ac" />
//                 </FormControl>
//                 <FormControl id="name" isRequired name="name">
//                   <FormLabel color="#5582ac">Your name</FormLabel>
//                   <Input color="#5582ac" />
//                 </FormControl>
//                 <Button
//                   mt="1rem"
//                   colorScheme="yellow"
//                   variant="solid"
//                   type="submit"
//                 >
//                   Join
//                 </Button>
//               </form>
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
//       </VStack>
//     </Center>
//   );
// };

// export default Home;


import React, { useState } from 'react';
import { Container, Paper, Tabs, Tab, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setName } from '../store/user';
import { generate } from 'random-words';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

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
          <Tab label="Join Game" />
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
