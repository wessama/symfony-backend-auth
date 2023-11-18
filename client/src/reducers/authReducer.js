const initialState = {
    token: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            const token = action.payload;

            localStorage.setItem('jwtToken', token);

            return { ...state, token: token };
        case 'LOGOUT':
            // Clear the JWT token from localStorage
            localStorage.removeItem('jwtToken');

            return { ...state, token: null };
        default:
            return state;
    }
};

export default authReducer;