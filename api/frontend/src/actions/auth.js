import axios from 'axios';

import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from './types';

// CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING })

    console.log(getState().auth)

    axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => {
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }).catch(err => {
        console.log(err);
        dispatch({
            type: AUTH_ERROR
        });
    })
}


// LOGIN USER
export const login = (username, password) => dispatch => {

    // Headers
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({ username, password });

    axios.post('/api/auth/login', body, config)
    .then(res => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        console.log(err);
        dispatch({
            type: LOGIN_FAIL
        });
    })
}

// REGISTER USER
export const register = ({ username, password, email }) => dispatch => {

    // Headers
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({ username, password, email });

    axios.post('/api/auth/register', body, config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
    }).catch(err => {
        console.log(err);
        dispatch({
            type: REGISTER_FAIL
        });
    })
}

// LOAGOUT USER
export const logout = () => (dispatch, getState) => {
    axios.post('/api/auth/logout/',null, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: LOGOUT_SUCCESS
        })
    }).catch(err => {
        console.log(err);
    })
}

// setup config with token - helper function 
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers : {
            'Content-Type': 'application/json'
        }
    };

    // if token, add to headers config
    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config
}