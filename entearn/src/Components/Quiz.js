

import React, { Component} from 'react';
import Alert from '@mui/material/Alert';
import questions from '../questions'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import '../App.css';
// import correctNotification from '../../assets/audio/correct-answer.mp3';
// import wrongNotification from '../../assets/audio/wrong-answer.mp3';
// import buttonSound from '../../assets/audio/button-sound.mp3';

class Play extends Component {
  constructor (props) {
    super(props);
    this.state = {
        questions,
        currentQuestion: {},
        nextQuestion: {},
        previousQuestion: {},
        answer: '',
        numberOfQuestions: 0,
        numberOfAnsweredQuestions: 0,
        currentQuestionIndex: 0,
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        hints: 5,
        fiftyFifty: 2,
        usedFiftyFifty: false,
        nextButtonDisabled: false,
        previousButtonDisabled: true,
        previousRandomNumbers: [],
        time: {}
    };
    this.interval = null;
    // this.correctSound = React.createRef();
    // this.wrongSound = React.createRef();
    // this.buttonSound = React.createRef();
}

componentDidMount () {
    const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
    this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
    this.startTimer();
}

componentWillUnmount () {
    clearInterval(this.interval);
}

displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
    let { currentQuestionIndex } = this.state;   
        questions = this.state.questions;
        currentQuestion = questions[currentQuestionIndex];
        nextQuestion = questions[currentQuestionIndex + 1];
        previousQuestion = questions[currentQuestionIndex - 1];
        const answer = currentQuestion.answer;
        this.setState({
            currentQuestion,
            nextQuestion,
            previousQuestion,
            numberOfQuestions: questions.length,
            answer,
            previousRandomNumbers: []
        }, () => {
            this.showOptions();
            this.handleDisableButton();
        });
        
};

handleOptionClick = (e) => {
    if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
        // this.correctTimeout = setTimeout(() => {
        //     // this.correctSound.current.play();
        // }, 500);
        this.correctAnswer();
    } else {
        // this.wrongTimeout = setTimeout(() => {
        //     // this.wrongSound.current.play();
        // }, 500);
        this.wrongAnswer();
    }
}

handleNextButtonClick = () => {
    clearInterval(this.interval);
    this.setState({
        time: {
            minutes: 0,
            seconds: 0
        }
    });
    this.startTimer();
    if (this.state.nextQuestion !== undefined) {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex + 1
        }), () => {
            this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        });
    }
};

handlePreviousButtonClick = () => {
    // this.playButtonSound();
    if (this.state.previousQuestion !== undefined) {
        this.setState(prevState => ({
            currentQuestionIndex: prevState.currentQuestionIndex - 1
        }), () => {
            this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        });
    }
};

handleQuitButtonClick = () => {
    // this.playButtonSound();
    if (window.confirm('Are you sure you want to quit?')) {
        this.props.history.push('/');
    }
};

handleButtonClick = (e) => {
    switch (e.target.id) {
        case 'next-button':
            this.handleNextButtonClick();
            break;

        case 'previous-button':
            this.handlePreviousButtonClick();
            break;

        case 'quit-button':
            this.handleQuitButtonClick();
            break;

        default:
            break;
    }
    
};

// playButtonSound = () => {
//     this.buttonSound.current.play();
// };

correctAnswer = () => {
     this.setState(prevState => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {            
        if (this.state.nextQuestion === undefined) {
            this.endGame();
        } else {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        }
    });
    return <Alert severity="success">Correct Answer!</Alert>
   
}

wrongAnswer = () => {
    navigator.vibrate(1000);
        this.setState(prevState => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), () => {
        if (this.state.nextQuestion === undefined) {
            this.endGame();
        } else {
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        }
    });
    return <Alert severity="info">Wrong Answer!</Alert>

}

showOptions = () => {
    const options = Array.from(document.querySelectorAll('.option'));

    options.forEach(option => {
        option.style.visibility = 'visible';
    });

    this.setState({
        usedFiftyFifty: false
    });
}

handleHints = () => {
    if (this.state.hints > 0) {
        const options = Array.from(document.querySelectorAll('.option'));
        let indexOfAnswer;

        options.forEach((option, index) => {
            if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                indexOfAnswer = index;
            }
        });

        while (true) {
            const randomNumber = Math.round(Math.random() * 3);
            if (randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)) {
                options.forEach((option, index) => {
                    if (index === randomNumber) {
                        option.style.visibility = 'hidden';
                        this.setState((prevState) => ({
                            hints: prevState.hints - 1,
                            previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                        }));
                    }
                });
                break;
            }
            if (this.state.previousRandomNumbers.length >= 3) break;
        }
    }
}

handleFiftyFifty = () => {
    if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
        const options = document.querySelectorAll('.option');
        const randomNumbers = [];
        let indexOfAnswer;

        options.forEach((option, index) => {
            if (option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
                indexOfAnswer = index;
            }
        });

        let count = 0;
        do {
            const randomNumber = Math.round(Math.random() * 3);
            if (randomNumber !== indexOfAnswer) {
                if (randomNumbers.length < 2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)) {
                        randomNumbers.push(randomNumber);
                        count ++;
                } else {
                    while (true) {
                        const newRandomNumber = Math.round(Math.random() * 3);
                        if (!randomNumbers.includes(newRandomNumber) && newRandomNumber !== indexOfAnswer) {
                            randomNumbers.push(newRandomNumber);
                            count ++;
                            break;
                        }
                    }
                }
            }
        } while (count < 2);

        options.forEach((option, index) => {
            if (randomNumbers.includes(index)) {
                option.style.visibility = 'hidden';
            }
        });
        this.setState(prevState => ({
            fiftyFifty: prevState.fiftyFifty - 1,
            usedFiftyFifty: true
        }));
    }
}

startTimer = () => {
    const countDownTime = Date.now() + 15000;
    this.interval = setInterval(() => {
        const now = new Date();
        const distance = countDownTime - now;

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(this.interval);
            this.setState({
                time: {
                    minutes: 0,
                    seconds: 0
                }
            }, () => {
                this.endGame();
            });
        } else {
            this.setState({
                time: {
                    minutes,
                    seconds,
                    distance
                }
            });
        }
    }, 1000);
}

handleDisableButton = () => {
    if (this.state.previousQuestion === undefined || this.state.currentQuestionIndex === 0) {
        this.setState({
            previousButtonDisabled: true
        });
    } else {
        this.setState({
            previousButtonDisabled: false
        });
    }

    if (this.state.nextQuestion === undefined || this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
        this.setState({
            nextButtonDisabled: true
        });
    } else {
        this.setState({
            nextButtonDisabled: false
        });
    }
}

endGame = () => {
    alert('Quiz has eneded!');
    const { state } = this;
    const playerStats = {
        score: state.score,
        numberOfQuestions: state.numberOfQuestions,
        numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers,
        fiftyFiftyUsed: 2 - state.fiftyFifty,
        hintsUsed: 5 - state.hints
    };
    setTimeout(() => {
        this.props.history.push('/play/quizSummary', playerStats);
    }, 1000);
}

render () {
    const { 
        currentQuestion, 
        currentQuestionIndex, 
        fiftyFifty, 
        hints, 
        numberOfQuestions,
        time 
    } = this.state;

    return (
            <div className="Quiz">
                <h2>Quiz Questions</h2>
                <div className="lifeline-container">
                    <p>
                        <span onClick={this.handleFiftyFifty} className="mdi mdi-set-center mdi-24px lifeline-icon">
                            <span className="lifeline">{fiftyFifty}</span>
                        </span>
                    </p>
                    <p>
                        <span onClick={this.handleHints} className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon">
                            <span className="lifeline">{hints}</span>
                        </span>
                    </p>
                </div>
                <div>
                        <Typography display="inline" variant="h5" color="blue">
                             {currentQuestionIndex + 1}
                        </Typography>
                        <Typography display="inline" variant="h5" color="blue">
                         {" of "}
                        </Typography>
                        <Typography display="inline" variant="h5" color="blue">
                             {numberOfQuestions}
                        </Typography>
            
                            
                        

                </div>
                <div>
                     <h5>{currentQuestion.question}</h5>
                    {time.minutes}:{time.seconds}
                </div>
                <div className="options-container">
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                </div>
                <div className="options-container">
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                    <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                </div>

                <centered>
                    <Button 
                        variant="contained"
                        id="previous-button" 
                        onClick={this.handleButtonClick}>
                        Previous
                    </Button>
                    <Button 
                        variant="contained"
                        id="next-button" 
                        onClick={this.handleButtonClick}>
                            Next
                        </Button>
                    <Button variant="contained" id="quit-button" >Quit</Button>
                </centered>
        </div>
    );
}
}


export default Play
