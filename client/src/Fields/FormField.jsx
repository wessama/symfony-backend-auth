import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';

const FormField = ({ control, name, label, type, rules, error, helperText }) => (
    <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({ field }) => (
            <TextField
                {...field}
                label={label}
                type={type || 'text'}
                variant="outlined"
                error={!!error}
                helperText={error ? helperText : ''}
            />
        )}
    />
);

export default FormField;
