const initialState = {
    hasRegistered: false
};

const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_SUCCESS':
            return { ...state, hasRegistered: true };
        case 'RESET_REGISTER':
            return { ...state, hasRegistered: false };
        default:
            return state;
    }
};

export default registrationReducer;
