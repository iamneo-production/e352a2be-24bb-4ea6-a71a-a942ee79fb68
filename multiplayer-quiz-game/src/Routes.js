import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
//import { Suspense, lazy } from "react";

// const GameRoom = lazy(() => import("./pages/GameRoom"));
// const Home = lazy(() => import("./pages/Home"));
import GameRoom from './pages/GameRoom';
import Home from './pages/Home';
import Categories from './components/Categories';
import Profile from './components/Profile';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import LeaderBoard from './components/LeaderBoard';
import Stats from './components/Stats';
import AppBar from './components/AppBar';
import Quiz from './components/Quiz';
import QuizSummary from './components/QuizSummary';
// import {
//   CSSReset,
// } from "@chakra-ui/react";


const AllRoutes = () => {
  return (
    
      
    <Router>
      {/* <CSSReset /> */}
          <nav>
              <AppBar/>
           </nav>
      <Routes>
       
          <Route exact path="/room/:id" Component={GameRoom}></Route>
          <Route exact path="/multiplayergame" Component={Home}></Route>
            <Route path="/" element={<SignUp/>}/>
             <Route path="/quiz" element={<Quiz/>}/>
             <Route path="/quizSummary" element={<QuizSummary/>}/>
             <Route path="/signin" element={<SignIn/>}/>
             <Route path="/profile" element={<Profile/>} />
             <Route path="/leaderboard" element={<LeaderBoard/>} />
             <Route path="/categories" element={<Categories/>} />
             <Route path="/stats" element={<Stats/>} />
      </Routes>
    </Router>
    
  );
};

export default AllRoutes;
