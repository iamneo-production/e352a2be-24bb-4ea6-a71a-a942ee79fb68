import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './components/home';
import QuizInstructions from './components/quiz/QuizInstructions';
import Play from './components/quiz/Play';
import QuizSummary from './components/quiz/QuizSummary';
function App() {
  return (
   
    <Router>
      <Routes>
<Route path ="/" exact Component={Home}></Route>
<Route path ="/play/instructions" exact Component={QuizInstructions}></Route>
<Route path ="/play/Quiz" exact Component={Play}></Route>
<Route path="/play/quizSummary" exact component={QuizSummary} />
</Routes>
    </Router>
    
   
  );
}

export default App;
