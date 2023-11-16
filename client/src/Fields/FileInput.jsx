import React, { useState } from 'react';
import { Button, Typography, IconButton, List, ListItem } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const FileInput = ({ control, setValue, register, name, label, multiple, acceptedTypes, maxFileSize, error }) => {
    const [fileNames, setFileNames] = useState([]);

    const handleFiles = (event) => {
        const files = Array.from(event.target.files);

        const validFiles = files.filter(file => file.size <= maxFileSize && acceptedTypes.test(file.type));
        setValue(name, validFiles, { shouldValidate: true });
        setFileNames(validFiles.map(file => file.name));
    };

    const clearFiles = () => {
        setValue(name, multiple ? [] : null);
        setFileNames([]);
    };

    return (
        <div>
            <Typography variant="body1">{label}:</Typography>
            <Button variant="contained" component="label">
                Choose File(s)
                <input
                    type="file"
                    hidden
                    multiple={multiple}
                    onChange={handleFiles}
                    accept={acceptedTypes}
                />
            </Button>
            {fileNames.length > 0 && (
                <IconButton onClick={clearFiles} size="small">
                    <ClearIcon fontSize="small" />
                </IconButton>
            )}
            {fileNames.length > 0 && (
                <List>
                    {fileNames.map((fileName, index) => (
                        <ListItem key={index}>
                            <Typography variant="body2">{fileName}</Typography>
                        </ListItem>
                    ))}
                </List>
            )}
            {error && (
                <Typography color="error" variant="body2">
                    {error}
                </Typography>
            )}
        </div>
    );
};

export default FileInput;
