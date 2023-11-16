import { createStore, combineReducers } from 'redux';
import registrationReducer from '../reducers/registrationReducer';
import authReducer from "../reducers/authReducer";

const rootReducer = combineReducers({
    registration: registrationReducer,
    auth: authReducer
    // Other reducers
});

const store = createStore(rootReducer);

export default store;
