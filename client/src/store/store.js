import { createStore, combineReducers } from 'redux';
import registrationReducer from '../reducers/registrationReducer';

const rootReducer = combineReducers({
    registration: registrationReducer
    // Other reducers
});

const store = createStore(rootReducer);

export default store;
