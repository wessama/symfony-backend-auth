import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, makeStyles } from '@material-ui/core';

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
            <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Email"
                        variant="outlined"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Password"
                        type="password"
                        variant="outlined"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                )}
            />
            <Button type="submit" variant="contained" color="primary">
                Login
            </Button>
        </form>
    );
}

export default LoginForm;
