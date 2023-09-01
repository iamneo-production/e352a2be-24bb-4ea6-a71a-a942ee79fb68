import React,{Component,Fragment} from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const QuizInstructions=()=>
{
return(
    <Fragment>
      <Helmet><title>Quiz Instructions-Quiz App</title></Helmet>
      <div className="instructions contaier">
        <h1 id='ap'>How to play game</h1>
        </div>  
        <ul className="browser-default" id="main-list">
            <li>the game have duration 15 min </li>
            <li>eacg game has 15 questions</li>
            <li>every question has 4 options 
                {/* <img src="" alt="" /> */}
                </li></ul> 
                <li>
                    select best answer.
                    {/* <img src="" alt="" /> */}
                </li>

                <div>
                    <span className="left"><Link to="/">No teck me back</Link></span>
                    <span className="right"><Link to="/play/Quiz">OKAY Let,play this</Link></span>

                </div>
    </Fragment>
        
)
}
export default QuizInstructions;