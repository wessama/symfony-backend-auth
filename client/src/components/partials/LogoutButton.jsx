import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';
import { Button } from '@material-ui/core';

const LogoutButton = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        // Dispatch the logout action
        dispatch(logout());
    };

    return (
        <Button onClick={handleLogout} variant="contained" color="secondary">
            Logout
        </Button>
    );
};

export default LogoutButton;
