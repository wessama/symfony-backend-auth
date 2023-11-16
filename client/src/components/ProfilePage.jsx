import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const token = useSelector(state => state.auth.token);
    const navigate = useNavigate();

    console.log(token);

    return <div>Profile Page</div>;
};

export default ProfilePage;