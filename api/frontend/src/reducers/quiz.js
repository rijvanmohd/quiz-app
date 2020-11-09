import { func } from "prop-types"
import { QUIZ_LOADING, QUIZ_LOADED, QUIZ_FAILED, QUIZ_SUBMIT, QUIZ_SUBMIT_FAILURE } from '../actions/types';

const initialState = {
    isLoading: false,
    quiz: {},
}

export default function(state = initialState, action) {
    switch(action.type) {
        case QUIZ_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case QUIZ_LOADED:
            return {
                ...state,
                isLoading: false,
                quiz: action.payload
            };
        case QUIZ_FAILED:
            return {
                ...state,
                isLoading: false,
                quiz: {}
            };
        case QUIZ_SUBMIT:
            return {
                ...state,
                result: action.payload
            }
        default:
            return state
    }
}