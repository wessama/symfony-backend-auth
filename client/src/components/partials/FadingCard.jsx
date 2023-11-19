import React from 'react';
import { Card, Fade, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: 275,
        maxWidth: 400,
        margin: theme.spacing(2),
    },
}));

const FadingCard = ({ children, ...props }) => {
    const classes = useStyles();

    return (
        <Fade in={true} timeout={600}>
            <Card className={classes.card} {...props}>
                {children}
            </Card>
        </Fade>
    );
};

export default FadingCard;