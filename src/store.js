import { createStore, combineReducers } from 'redux';
import { routes } from './reducers';

const reducers = {
    routes
};

const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && // hook into browser extensions
    window.__REDUX_DEVTOOLS_EXTENSION__()
);