import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {CardContent, makeStyles, Typography} from '@material-ui/core';
import {ENDPOINTS} from '../config/apiConfig';
import FormField from '../fields/FormField';
import FileInput from "../fields/FileInput";
import {useDispatch} from 'react-redux';
import {registerSuccess} from '../actions/registrationActions';
import axios from "axios";
import {Layout} from "./partials/Layout";
import FadingCard from "./partials/FadingCard";
import SubmitButton from "./partials/SubmitButton";

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
    const {control, handleSubmit, setError, register, setValue, formState: {errors}} = useForm({mode: 'onBlur'});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        register('avatar');
        register('photos', {required: 'At least one photo is required'});
    }, [register]);

    const onSubmit = async (data) => {
        setIsLoading(true);
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
                // Dispatch action to indicate user has just registered
                dispatch(registerSuccess());
                navigate('/success');
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Set errors for each field
                Object.entries(error.response.data.errors).forEach(([key, value]) => {
                    setError(key, {type: 'manual', message: value});
                });
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
                        Register
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <FormField
                            control={control}
                            name="email"
                            label="Email"
                            rules={{required: 'Email is required' }}
                            error={errors.email}
                            helperText={errors.email?.message}
                        />
                        <FormField
                            control={control}
                            name="password"
                            label="Password"
                            type="password"
                            rules={{required: 'Password is required'}}
                            error={errors.password}
                            helperText={errors.password?.message}
                        />
                        <FormField
                            control={control}
                            name="firstName"
                            label="First Name"
                            type="text"
                            rules={{required: 'First name is required', minLength: {value: 2, message: 'You need to enter a minimum of 2 characters'}, maxLength: {value: 25, message: 'You need to enter a maximum of 25 characters'}}}
                            error={errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                        <FormField
                            control={control}
                            name="lastName"
                            label="Last Name"
                            type="text"
                            rules={{required: 'Last name is required', minLength: {value: 2, message: 'You need to enter a minimum of 2 characters'}, maxLength: {value: 25, message: 'You need to enter a maximum of 25 characters'}}}
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
                        <SubmitButton isLoading={isLoading} text="Register" />
                        <Typography variant="body2" className={classes.linkButton}>
                            Already have an account? <Link to="/login" color="primary"> Login </Link>
                        </Typography>
                    </form>
                </CardContent>
            </FadingCard>
        </Layout>
    );
}

export default RegistrationForm;
