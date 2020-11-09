import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import { batchDispatchMiddleware, enableBatching } from 'redux-batched-actions';

const initialState = {};

const middleware = [ thunk, batchDispatchMiddleware ];

const store = createStore(
    enableBatching(rootReducer),
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;