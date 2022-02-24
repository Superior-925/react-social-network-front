import React from 'react';
import TextField from '@mui/material/TextField';
import classes from './find-friends.module.scss';
import PeopleIcon from '@mui/icons-material/People';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from "@mui/material/Button";
import FriendsService from "../../services/friends-service";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const FindFriends = (props) => {

    const [spinner, setSpinner] = React.useState(false);

    const [foundFriends, setFoundFriends] = React.useState([]);

    const [open, setOpen] = React.useState(false);

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const validationSchema = yup.object().shape({
        friendName: yup.string().required('Required'),
    });

    function findFriends(values, resetForm) {
        const friendsIgnoreIds = [];
        friendsIgnoreIds.push(localStorage.getItem("userId"));
        handleClickOpen();
        setSpinner(true);
        FriendsService.findFriends(values.friendName, friendsIgnoreIds).then((response) => {
            const foundFriends = [];
            response.data.forEach((item) => {
                const candidate = {nickName: item.nickname, email: item.email, id: item._id};
                foundFriends.push(candidate);
            });
            setSpinner(false);
            setFoundFriends([...foundFriends])
        });
        resetForm();
    }

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    friendName: ''
                }}
                validateOnBlur
                onSubmit={(values, { resetForm }) => {findFriends(values, resetForm)}}
                validationSchema={validationSchema}
                validateOnChange
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                    <div className={classes.searchForm}>
                        <TextField
                            sx={{
                                width: "85%"
                            }}
                            label="Name of friend"
                            type={`text`}
                            name={`friendName`}
                            onBlur={handleBlur}
                            value={values.friendName}
                            onChange={handleChange}
                            multiline
                        />
                        <Button
                            sx={{
                                width: "30%",
                                height: "3.5rem",
                                marginLeft: "1rem",
                                fontSize: "1rem",
                                textTransform: "none"
                            }}
                            variant="outlined"
                            disabled={!isValid || !dirty}
                            onClick={handleSubmit}
                            type={`submit`}
                        ><PeopleIcon
                            sx={{
                                marginRight: "0.3rem"
                            }}
                        />Find friends
                        </Button>
                    </div>
                )}
            </Formik>

            <BootstrapDialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <div>Searching results</div>
                </BootstrapDialogTitle>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                    dividers>
                    <div>
                        {spinner && <Box
                        sx={{
                            display: 'flex',
                            justifyContent: "center"
                        }}>
                            <CircularProgress />
                        </Box>}
                        {!spinner &&
                            foundFriends.map((item, index)=> {
                                return (
                                    <div key={index} className={classes.searchResultsBlockItem}>
                                        <div className={classes.foundFriendName}>
                                            {item.nickName}
                                        </div>
                                        <Button
                                            sx={{
                                                variant: "contained",
                                                display: "flex",
                                                alignItems: "center"
                                            }}
                                            variant="contained"
                                        >
                                            <PersonAddIcon
                                                sx={{
                                                    marginRight: "0.3rem"
                                                }}
                                            /> Add to friends
                                        </Button>

                                    </div>
                                )
                            })
                        }
                    </div>
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
};

export default FindFriends;
