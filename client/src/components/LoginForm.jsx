import React, {useState} from 'react';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import {Link} from "react-router-dom";
import FormField from '../fields/FormField';
import {useDispatch} from 'react-redux';
import {CardContent, makeStyles, Typography} from '@material-ui/core';
import {loginSuccess} from '../actions/authActions';
import {ENDPOINTS} from '../config/apiConfig';
import {Layout} from "./partials/Layout";
import SubmitButton from "./partials/SubmitButton";
import FadingCard from "./partials/FadingCard";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        margin: theme.spacing(2),
    },
    linkButton: {
        marginTop: theme.spacing(1),
    },
}));

function LoginForm() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {control, handleSubmit, setError, formState: {errors}} = useForm();
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
                setError("username", {type: "manual", message: error.response.data.message});
                setError("password", {type: "manual", message: error.response.data.message});
                setLoginError(error.response.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <FadingCard>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Login
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <FormField
                            control={control}
                            name="username"
                            label="Email"
                            rules={{required: 'Email is required'}}
                            error={errors.email}
                            helperText={errors.email?.message || loginError}
                        />
                        <FormField
                            control={control}
                            name="password"
                            label="Password"
                            type="password"
                            rules={{required: 'Password is required'}}
                            error={errors.password}
                            helperText={errors.password?.message || loginError}
                        />
                        <SubmitButton isLoading={isLoading} text="Login" />
                        <Typography variant="body2" className={classes.linkButton}>
                            Not registered? <Link to="/register" color="primary"> Create an account </Link>
                        </Typography>
                    </form>
                </CardContent>
            </FadingCard>
        </Layout>
    );
}

export default LoginForm;