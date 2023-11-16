import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

const AuthGuard = ({ children, type }) => {
    const isAuthenticated = useSelector(state => state.auth.token);

    if (type === 'guest' && isAuthenticated) {
        return <Navigate to="/profile" />;
    } else if (type === 'private' && !isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default AuthGuard;
