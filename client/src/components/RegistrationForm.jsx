import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextField, makeStyles, Typography, IconButton, List, ListItem } from '@material-ui/core';
import FormField from '../Fields/FormField';
import ClearIcon from '@material-ui/icons/Clear';

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
    const [photoFileNames, setPhotoFileNames] = useState([]);
    const [avatarFileName, setAvatarFileName] = useState('');

    useEffect(() => {
        register('avatar');
        register('photos', { required: 'At least one photo is required' });
    }, [register]);

    const handlePhotoFiles = (event) => {
        const files = Array.from(event.target.files);
        setValue('photos', files, { shouldValidate: true });
        setPhotoFileNames(files.map(file => file.name));
    };

    const handleAvatarFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            setValue('avatar', file);
            setAvatarFileName(file.name);
        }
    };

    const clearPhotoSelection = () => {
        setValue('photos', []);
        setPhotoFileNames([]);
    };

    const clearAvatarSelection = () => {
        setValue('avatar', null);
        setAvatarFileName('');
    };

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

            <div className={classes.fileInput}>
                <Typography variant="body1">Upload Avatar:</Typography>
                <Button variant="contained" component="label">
                    Choose File
                    <input type="file" hidden onChange={handleAvatarFile} />
                </Button>
                {avatarFileName && (
                    <IconButton className={classes.clearButton} onClick={clearAvatarSelection} size="small">
                        <ClearIcon fontSize="small" />
                    </IconButton>
                )}
            </div>
            {avatarFileName && (
                <Typography variant="body2">{avatarFileName}</Typography>
            )}

            <div className={classes.fileInput}>
                <Typography variant="body1">Upload Photos:</Typography>
                <Button variant="contained" component="label">
                    Choose Files
                    <input type="file" multiple hidden onChange={handlePhotoFiles} />
                </Button>
                {photoFileNames.length > 0 && (
                    <IconButton className={classes.clearButton} onClick={clearPhotoSelection} size="small">
                        <ClearIcon fontSize="small" />
                    </IconButton>
                )}
            </div>
            {photoFileNames.length > 0 && (
                <List className={classes.fileNames}>
                    {photoFileNames.map((name, index) => (
                        <ListItem key={index}>
                            <Typography variant="body2">{name}</Typography>
                        </ListItem>
                    ))}
                </List>
            )}
            {errors.photos && (
                <Typography color="error" variant="body2">
                    {errors.photos.message}
                </Typography>
            )}

            <Button type="submit" variant="contained" color="primary">
                Register
            </Button>
        </form>
    );
}

export default RegistrationForm;
