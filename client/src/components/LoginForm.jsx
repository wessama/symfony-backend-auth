import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, makeStyles } from '@material-ui/core';
import FormField from '../fields/FormField';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../actions/authActions';
import { CircularProgress } from '@material-ui/core';
import { ENDPOINTS } from '../config/apiConfig';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
}));

function LoginForm() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { control, handleSubmit, setError, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(ENDPOINTS.LOGIN, data);
            if (response.status === 200) {
                const token = response.data.token;

                dispatch(loginSuccess(token));
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Set error for both fields and a general login error
                setError("username", { type: "manual", message: error.response.data.message });
                setError("password", { type: "manual", message: error.response.data.message });
                setLoginError(error.response.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <FormField
                control={control}
                name="username"
                label="Email"
                rules={{ required: 'Email is required' }}
                error={errors.email}
                helperText={errors.email?.message || loginError}
            />
            <FormField
                control={control}
                name="password"
                label="Password"
                type="password"
                rules={{ required: 'Password is required' }}
                error={errors.password}
                helperText={errors.password?.message || loginError}
            />
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
        </form>
    );
}

export default LoginForm;
