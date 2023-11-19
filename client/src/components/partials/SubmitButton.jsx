import React from 'react';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    submitButton: {
        marginTop: theme.spacing(2),
    },
    progress: {
        color: theme.palette.common.white,
    },
}));

const SubmitButton = ({ isLoading, text }) => {
    const classes = useStyles();

    return (
        <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submitButton}
            disabled={isLoading}
            fullWidth
        >
            {isLoading ? <CircularProgress size={24} className={classes.progress} /> : text}
        </Button>
    );
};

export default SubmitButton;
