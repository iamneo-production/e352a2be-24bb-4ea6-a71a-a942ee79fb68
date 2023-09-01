
import './App.css';
import UserProvider from './Components/store/userProvider';
import Categories from './Components/Categories';
import Profile from './Components/Profile';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeaderBoard from './Components/LeaderBoard';
import Stats from './Components/Stats';
import AppBar from './Components/AppBar';
import Quiz from './Components/Quiz';
import QuizSummary from './Components/QuizSummary';
function App() {
  return (
    <UserProvider>
       <BrowserRouter>
           <nav>
              <AppBar/>
           </nav>
           <Routes>
             <Route path="/" element={<SignUp/>}/>
             <Route path="quiz" element={<Quiz/>}/>
             <Route path="quizSummary" element={<QuizSummary/>}/>
             <Route path="signin" element={<SignIn/>}/>
             <Route path="profile" element={<Profile/>} />
             <Route path="leaderboard" element={<LeaderBoard/>} />
             <Route path="categories" element={<Categories/>} />
             <Route path="stats" element={<Stats/>} />
        </Routes>
       </BrowserRouter>
    </UserProvider>
  );
}

export default App;
