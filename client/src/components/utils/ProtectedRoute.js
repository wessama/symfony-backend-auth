import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const hasRegistered = useSelector(state => state.registration.hasRegistered);

    if (!hasRegistered) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
