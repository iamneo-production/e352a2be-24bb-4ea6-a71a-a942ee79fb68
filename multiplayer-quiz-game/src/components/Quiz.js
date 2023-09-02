import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgressWithLabel from '../components/CircularProgress';
import '../App.css';
import axios from 'axios';

const Play = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [answer, setAnswer] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [hints, setHints] = useState(5);
  const [fiftyFifty, setFiftyFifty] = useState(2);
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [previousButtonDisabled, setPreviousButtonDisabled] = useState(true);
  const [previousRandomNumbers, setPreviousRandomNumbers] = useState([]);
  const [time, setTime] = useState({});
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/questions")
      .then((res) => {
        setQuestions(res.data);
        displayQuestions();
        startTimer();
      })
      .catch((err) => {
        throw new Error(err.message || "Get trivia questions failed");
      });
  }, []);

  useEffect(() => {
    if (currentQuestionIndex === numberOfQuestions - 1) {
      endGame();
    }
  }, [currentQuestionIndex, numberOfQuestions]);

  useEffect(() => {
    handleDisableButton();
  }, [currentQuestionIndex]);

  const displayQuestions = () => {
    const currentQues = questions[currentQuestionIndex];
    setCurrentQuestion(currentQues);
    setAnswer(currentQues.correctChoice);
    setNumberOfQuestions(questions.length);
    setPreviousRandomNumbers([]);
  };

  const handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === answer.toLowerCase()) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  };

  const handleNextButtonClick = () => {
    clearInterval(intervalId);
    setTime({
      minutes: 0,
      seconds: 0,
    });
    startTimer();
    if (currentQuestionIndex < numberOfQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousButtonClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuitButtonClick = () => {
    if (window.confirm('Are you sure you want to quit?')) {
      navigate('/');
    }
  };

  const correctAnswer = () => {
    setScore(score + 1);
    setCorrectAnswers(correctAnswers + 1);
    if (currentQuestionIndex === numberOfQuestions - 1) {
      endGame();
    } else {
      handleNextButtonClick();
    }
  };

  const wrongAnswer = () => {
    setWrongAnswers(wrongAnswers + 1);
    if (currentQuestionIndex === numberOfQuestions - 1) {
      endGame();
    } else {
      handleNextButtonClick();
    }
  };

  const startTimer = () => {
    const countDownTime = Date.now() + 60000;
    const id = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(id);
        setTime({
          minutes: 0,
          seconds: 0,
        });
        endGame();
      } else {
        setTime({
          minutes,
          seconds,
          distance,
        });
      }
    }, 1000);
    setIntervalId(id);
  };

  const handleDisableButton = () => {
    setPreviousButtonDisabled(currentQuestionIndex === 0);
    setNextButtonDisabled(currentQuestionIndex === numberOfQuestions - 1);
  };

  const endGame = () => {
    alert('Quiz has ended!');
    navigate('/quizSummary');
    console.log("uhvciyfguoblij");
  };

  return (
    <div className="Quiz">
      <h2>Quiz Questions</h2>
      <div className="lifeline-container">
        <p>
          <span
            onClick={handleFiftyFifty}
            className="mdi mdi-set-center mdi-24px lifeline-icon"
          >
            <span className="lifeline">{fiftyFifty}</span>
          </span>
        </p>
        <p>
          <span
            onClick={handleHints}
            className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"
          >
            <span className="lifeline">{hints}</span>
          </span>
        </p>
      </div>
      <div>
        <Typography display="inline" variant="h5" color="blue">
          {currentQuestionIndex + 1}
        </Typography>
        <Typography display="inline" variant="h5" color="blue">
          {' of '}
        </Typography>
        <Typography display="inline" variant="h5" color="blue">
          {numberOfQuestions}
        </Typography>
      </div>
      <div>
        <Typography display="inline" variant="h5">
          {currentQuestion.text}
        </Typography>
        <CircularProgressWithLabel
          variant="determinate"
          value={time.seconds}
        />
      </div>
      {currentQuestion.choices.map((choice, index) => (
        <div className="option" key={index}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleOptionClick}
          >
            {choice}
          </Button>
        </div>
      ))}
      <div>
        <Button
          variant="contained"
          id="previous-button"
          onClick={handleButtonClick}
          disabled={previousButtonDisabled}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          id="next-button"
          onClick={handleButtonClick}
          disabled={nextButtonDisabled}
        >
          Next
        </Button>
        <Button
          variant="contained"
          id="quit-button"
          onClick={handleQuitButtonClick}
        >
          Quit
        </Button>
      </div>
    </div>
  );
};

export default Play;
