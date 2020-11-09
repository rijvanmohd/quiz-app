import axios from 'axios';

import { QUIZ_LOADING, QUIZ_LOADED, QUIZ_FAILED, ANSWER_SAVED, ANSWER_FAILURE, QUIZ_SUBMIT, QUIZ_SUBMIT_FAILURE } from './types';
import { tokenConfig } from './auth';

// CHECK TOKEN AND LOAD QUIZ
export const loadQuiz = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: QUIZ_LOADING })

    // console.log(getState().auth)

    axios.get('/api/quizzes/math-and-science-quiz', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: QUIZ_LOADED,
            payload: res.data.quiz
        })
    }).catch(err => {
        console.log(err);
        dispatch({
            type: QUIZ_FAILED
        });
    })
}


// SAVE ANSWER
export const saveAnswer = (quiztaker, question, answer) => (dispatch, getState) => {

    // Request Body
    const body = JSON.stringify({ quiztaker, question, answer });

    axios.patch('/api/save-answer/', body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: ANSWER_SAVED,
            payload: res.data
        })
    }).catch(err => {
        console.log(err);
        dispatch({
            type: ANSWER_FAILURE
        });
    })
}

// SUBMIT QUIZ
export const submitQuiz = (quiztaker, question, answer) => (dispatch, getState) => {

    // Request Body
    const body = JSON.stringify({ quiztaker, question, answer });

    axios.post('/api/quizzes/math-and-science-quiz/submit/', body, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: QUIZ_SUBMIT,
            payload: res.data
        })
    }).catch(err => {
        console.log(err);
        dispatch({
            type: QUIZ_SUBMIT_FAILURE
        });
    })
}