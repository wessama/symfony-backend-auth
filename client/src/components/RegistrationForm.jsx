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
        register('avatars'); // Register the file input field
    }, [register]);

    const [fileNames, setFileNames] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setValue('photos', files);

        // Extract and set file names
        const fileNames = files.map(file => file.name);
        setFileNames(fileNames);
    };

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

            <Typography variant="body1" className={classes.fileInput}>
                Upload Avatar:
            </Typography>
            <Button
                variant="contained"
                component="label"
            >
                Choose Files
                <input
                    type="file"
                    hidden
                />
            </Button>

            <Typography variant="body1" className={classes.fileInput}>
                Upload Photos:
            </Typography>
            <Button
                variant="contained"
                component="label"
            >
                Choose Files
                <input
                    type="file"
                    multiple
                    hidden
                    onChange={handleFileChange}
                />
            </Button>
            {fileNames.length > 0 && (
                <div className={classes.fileNames}>
                    {fileNames.map((name, index) => (
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
