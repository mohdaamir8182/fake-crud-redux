import { createStore , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createWrapper } from "next-redux-wrapper"
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers'

const middleware = [thunk];

const initialState = {};

const store = createStore( 
    rootReducer , 
    initialState , 
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;

export const makeStore = () => createStore(store);

export const wrapper = createWrapper(makeStore);