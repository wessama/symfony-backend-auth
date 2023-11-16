import React, {useEffect, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import {Button, TextField, makeStyles, FormControl, InputLabel, Typography} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
    fileNames: {
        marginTop: theme.spacing(2),
    },
}));

function RegistrationForm() {
    const classes = useStyles();
    const { control, handleSubmit, register, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        register('avatar');
        register('photos', { required: 'At least one photo is required' });
    }, [register]);

    const [photoFileNames, setPhotoFileNames] = useState([]);

    const [avatarFileName, setAvatarFileName] = useState('');

    const handlePhotoFiles = (event) => {
        const files = Array.from(event.target.files);
        setValue('photos', files, { shouldValidate: true });

        // Extract and set file names
        const fileNames = files.map(file => file.name);
        setPhotoFileNames(fileNames);
    };

    const handleAvatarFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            setValue('avatar', file);
            setAvatarFileName(file.name);
        }
    }

    const onSubmit = (data) => {
        console.log(data);
        // Registration logic goes here
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
            <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{ required: 'First name is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="First Name"
                        type="text"
                        variant="outlined"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                )}
            />
            <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{ required: 'Last name is required' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Last Name"
                        type="text"
                        variant="outlined"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                )}
            />

            <Typography variant="body1" className={classes.fileInput}>
                Upload Avatar:
            </Typography>
            <Button
                variant="contained"
                component="label"
            >
                Choose File
                <input
                    type="file"
                    hidden
                    onChange={handleAvatarFile}
                />
            </Button>
            {avatarFileName && (
                <Typography variant="body2" className={classes.fileName}>
                    {avatarFileName}
                </Typography>
            )}

            <Typography variant="body1" className={classes.fileInput}>
                Upload Photos:
            </Typography>
            {errors.photos && (
                <Typography color="error" variant="body2">
                    {errors.photos.message}
                </Typography>
            )}
            <Button
                variant="contained"
                component="label"
            >
                Choose Files
                <input
                    type="file"
                    multiple
                    hidden
                    onChange={handlePhotoFiles}
                />
            </Button>
            {photoFileNames.length > 0 && (
                <div className={classes.fileNames}>
                    {photoFileNames.map((name, index) => (
                        <Typography key={index} variant="body2">
                            {name}
                        </Typography>
                    ))}
                </div>
            )}

            <Button type="submit" variant="contained" color="primary">
                Register
            </Button>
        </form>
    );
}

export default RegistrationForm;
