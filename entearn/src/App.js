
import './App.css';
import UserProvider from './components/store/userProvider';
import Categories from './components/Categories';
import Profile from './components/Profile';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeaderBoard from './components/LeaderBoard';
import Stats from './components/Stats';
import AppBar from './components/AppBar';
import Quiz from './components/Quiz';
import QuizSummary from './components/QuizSummary';
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
