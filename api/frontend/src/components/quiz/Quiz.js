import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Quiz.css';

import { connect } from 'react-redux';
import { saveAnswer, submitQuiz } from '../../actions/quiz';
import store from '../../store';

function Quiz(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);

	const handleAnswerOptionClick = (answer) => {
    props.saveAnswer(props.quiz.quiztakers_set.id, currentQuestion+1, answer);

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < props.quiz.question_set.length) {
			setCurrentQuestion(nextQuestion);
		} else {
      props.submitQuiz(props.quiz.quiztakers_set.id, nextQuestion, answer);
      setShowScore(true);
		}
  };


  
  // console.log('quiz props',props)

  return (
    <div className='app'>
			{ props.quiz.question_set && showScore ? (
				<div className='score-section'>
          { store.getState().quiz_details.result ?
          `You scored ${store.getState().quiz_details.result.quiztaker_set.score} out of ${props.quiz.total_point}`
          :
          'Loading Result ...'
          }
				</div>
      ) : 
      props.quiz.question_set ? (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{props.quiz.question_set.length}
						</div>
						<div className='question-text'>{props.quiz.question_set[currentQuestion].label}</div>
					</div>
					<div className='answer-section'>
						{props.quiz.question_set[currentQuestion].answers.map((answerOption) => (
							<button key={answerOption.id} className='answer-content' onClick={() => handleAnswerOptionClick(answerOption.id)}>{answerOption.text}</button>
						))}
					</div>
				</>
      )
      :
      ""
    }
    </div>
  );
}

Quiz.propTypes = {
  quiz: PropTypes.object.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  submitQuiz: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // if(showScore){
  //   result: state.result.quiztaker_set.score
  // }
});

export default connect(mapStateToProps, { saveAnswer, submitQuiz })(Quiz);
