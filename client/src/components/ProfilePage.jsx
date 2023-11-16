import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const token = useSelector(state => state.auth.token);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return <div>Profile Page</div>;
};

export default ProfilePage;