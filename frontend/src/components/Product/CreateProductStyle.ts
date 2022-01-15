import { makeStyles } from '@material-ui/core';

const createProductStyle = makeStyles((theme) => ({
    createProductPaper: {
        [theme.breakpoints.down('lg')]: {
            width: '80%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        width: '50%',
        margin: '10px',
    },
    createProductFormWrapper: {
        [theme.breakpoints.down('lg')]: {
            width: '80%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
        width: '90%',
        margin: 'auto',
    },
    Typo: {
        padding: 7,
        marginTop: 2,
    },
    productTitle: {
        fontWeight: 600,
        float: 'left',
    },
    descriptionBox: {
        width: '100%',
        marginTop: 15,
    },
    descriptionFields: {
        width: '100%',
        marginTop: 5,
    },
    dateFields: {
        width: '100%',
        marginTop: 35,
    },
}));

export default createProductStyle;
