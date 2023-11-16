import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, makeStyles } from '@material-ui/core';
import FormField from '../Fields/FormField';
import FileInput from "../Fields/FileInput";

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
    fileInput: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
    },
    fileNames: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100px',
        overflowY: 'auto',
        marginTop: theme.spacing(1),
    },
    clearButton: {
        marginLeft: theme.spacing(1),
    },
}));

function RegistrationForm() {
    const classes = useStyles();
    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm({ mode: 'onBlur' });

    useEffect(() => {
        register('avatar');
        register('photos', { required: 'At least one photo is required' });
    }, [register]);

    const onSubmit = (data) => {
        console.log(data);
        // Registration logic goes here
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
            <FormField
                control={control}
                name="firstName"
                label="First Name"
                type="text"
                rules={{ required: 'First name is required' }}
                error={errors.firstName}
                helperText={errors.firstName?.message}
            />
            <FormField
                control={control}
                name="lastName"
                label="Last Name"
                type="text"
                rules={{ required: 'Last name is required' }}
                error={errors.lastName}
                helperText={errors.lastName?.message}
            />
            <FileInput
                control={control}
                setValue={setValue}
                register={register}
                name="avatar"
                label="Upload Avatar"
                multiple={false}
                acceptedTypes={/image\/.*/}
                maxFileSize={5000000} // 5MB
                error={errors.avatar?.message}
            />
            <FileInput
                control={control}
                setValue={setValue}
                register={register}
                name="photos"
                label="Upload Photos"
                multiple={true}
                acceptedTypes={/image\/.*/}
                maxFileSize={5000000} // 5MB
                error={errors.photos?.message}
            />
            <Button type="submit" variant="contained" color="primary">
                Register
            </Button>
        </form>
    );
}

export default RegistrationForm;
