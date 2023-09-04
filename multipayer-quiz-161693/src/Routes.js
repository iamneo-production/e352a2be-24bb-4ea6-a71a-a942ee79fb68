import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import GameRoom from './pages/GameRoom';
import Home from './pages/Home';
import Categories from './components/Categories';
import Profile from './components/Profile';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import LeaderBoard from './components/LeaderBoard';
import Stats from './components/Stats';
import AppBar from './components/AppBar';
import {PlaywithRouter} from "./components/Quiz";
import QuizSummary from './components/QuizSummary';
import ProtectedRoutes from "./protectedRoutes";


const AllRoutes = () => {
  return (
    
      
    <Router>
      {/* <CSSReset /> */}
          <nav>
              <AppBar/>
           </nav>
      <Routes>
           <Route path="/" element={<SignUp/>}/>
           <Route path="/signin" element={<SignIn/>}/>
              
           <Route element={<ProtectedRoutes/>}> 
             <Route exact path="/room/:id/:mode" Component={GameRoom}></Route>
             <Route exact path="/game/:mode/:cat" Component={Home}></Route>
             <Route path="/quiz" Component={PlaywithRouter} />
             <Route path="/quizSummary" element={<QuizSummary/>}/>
             <Route path="/profile" element={<Profile/>} />
             <Route path="/leaderboard" element={<LeaderBoard/>} />
             <Route path="/categories" element={<Categories/>} />
             <Route path="/stats" element={<Stats/>} />
           </Route>    
      </Routes>
    </Router>
    
  );
};

export default AllRoutes;
