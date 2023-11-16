import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, makeStyles } from '@material-ui/core';
import FormField from '../fields/FormField';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
}));

function LoginForm() {
    const classes = useStyles();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Login logic goes here
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <FormField
                control={control}
                name="email"
                label="Email"
                rules={{ required: 'Email is required' }}
                error={errors.email}
                helperText={errors.email?.message}
            />
            <FormField
                control={control}
                name="password"
                label="Password"
                type="password"
                rules={{ required: 'Password is required' }}
                error={errors.password}
                helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" color="primary">
                Login
            </Button>
        </form>
    );
}

export default LoginForm;
