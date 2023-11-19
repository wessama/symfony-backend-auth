import {Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(3),
    },
}));

export const Layout = ({ children, ...props }) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.container} {...props}>
            <Grid item>
                {children}
            </Grid>
        </Grid>
    );
}