import { createStore, combineReducers } from 'redux';
import registrationReducer from '../reducers/registrationReducer';
import authReducer from "../reducers/authReducer";

const rootReducer = combineReducers({
    registration: registrationReducer,
    auth: authReducer
    // Other reducers
});

const persistedState = {
    auth: {
        token: localStorage.getItem('jwtToken')
    }
};

const store = createStore(rootReducer, persistedState);

export default store;
