
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(4),
    },

    calendarContainer: {
        flex: 1,
        position: 'relative',
        minHeight: '20rem',
        marginTop: '2rem',
        overflow: 'hidden',
        width: '90%',
    },
}));

export default useStyles;
