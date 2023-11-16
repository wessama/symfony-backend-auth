import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {Button, CircularProgress, makeStyles} from '@material-ui/core';
import { ENDPOINTS } from '../config/apiConfig';
import FormField from '../fields/FormField';
import FileInput from "../fields/FileInput";
import { useDispatch } from 'react-redux';
import { registerSuccess } from '../actions/registrationActions';
import axios from "axios";

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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { control, handleSubmit, setError, register, setValue, formState: { errors } } = useForm({ mode: 'onBlur' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        register('avatar');
        register('photos', { required: 'At least one photo is required' });
    }, [register]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            // Append form data
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('firstName', data.firstName);
            formData.append('lastName', data.lastName);
            // For files
            if (data.avatar) {
                formData.append('avatar', data.avatar[0]);
            }
            if (data.photos) {
                data.photos.forEach(photo => {
                    formData.append('photos[]', photo);
                });
            }

            const response = await axios.post(ENDPOINTS.REGISTER, formData);
            if (response.status === 201) {
                dispatch(registerSuccess());
                navigate('/success');
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Set errors for each field
                Object.entries(error.response.data.errors).forEach(([key, value]) => {
                    setError(key, { type: 'manual', message: value });
                });
            }
        } finally {
            setLoading(false);
        }
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
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
        </form>
    );
}

export default RegistrationForm;
