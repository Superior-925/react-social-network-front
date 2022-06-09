import React, {useState, useRef, useEffect} from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import ProfileService from "../../services/profile-service";

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

    useEffect(() => {
        FriendsService.getFriendRequests(localStorage.getItem('userId')).then((response) => {
            const friendRequestArr = [];
            // response.data.iCandidate.forEach((item) => {
            //     const requestToMe = {userId: item.userId, candidateId: item.candidateId};
            //     friendRequestArr.push(requestToMe);
            // });
            // setFriendsRequests([...friendRequestArr], (current) => {});
        });
    }, []);

    const [friendsRequests, setFriendsRequests] = useStateWithCallbackLazy([]);

    const [emptyFoundFriendsArr, setEmptyFoundFriendsArr] = React.useState(false);

    const [findFriendsSpinner, setFindFriendsSpinner] = React.useState(false);

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

    const findFriends = (values, resetForm) => {
        const friendsIgnoreIds = [];
        friendsIgnoreIds.push(localStorage.getItem("userId"));
        handleClickOpen();
        setFindFriendsSpinner(true);
        FriendsService.findFriends(values.friendName, friendsIgnoreIds).then((response) => {
            const foundFriends = [];
            response.data.forEach((item) => {
                const candidate = {nickName: item.nickname, email: item.email, id: item._id};
                foundFriends.push(candidate);
            });
            if (!foundFriends.length) {
                setEmptyFoundFriendsArr(true)
            }
            if (foundFriends.length) {
                setEmptyFoundFriendsArr(false)
            }
            setFindFriendsSpinner(false);
            setFoundFriends([...foundFriends]);
            resetForm();
            FriendsService.getFriendRequests(localStorage.getItem('userId')).then((response) => {
                const friendRequestArr = [];
                response.data.candidates.forEach((item) => {
                    const friendRequest = {userId: item.userId, candidateId: item.candidateId};
                    friendRequestArr.push(friendRequest);
                });
                setFriendsRequests([...friendRequestArr], (currentArr) => {
                    foundFriends.map((friend) => {
                        currentArr.map((candidate) => {
                            if (friend.id === candidate.candidateId) {
                                const button = document.getElementById(candidate.candidateId);
                                button.style.pointerEvents = "none";
                                button.style.color = "#666666";
                                button.style.backgroundColor = "#cccccc";
                                button.textContent = "Request already sent";

                                const deleteButton = document.getElementById(`delete-button-${friend.id}`);
                                deleteButton.style.display = "block";
                            }
                        })
                    })
                });
            });
        });
    };

    const addFriendRequest = (event, userId, candidateId) => {
        setFindFriendsSpinner(true);

        FriendsService.addFriendRequest(userId, candidateId).then((response) => {
            if (response.status === 200) {
                setFindFriendsSpinner(false);
                const friendRequestArr = [...friendsRequests];
                const friendRequest = {userId: userId, candidateId: candidateId};
                friendRequestArr.push(friendRequest);
                setFriendsRequests([...friendRequestArr], (currentArr) => {
                    foundFriends.map((friend) => {
                        currentArr.map((candidate) => {
                            if (friend.id === candidate.candidateId) {
                                const button = document.getElementById(friend.id);
                                button.style.pointerEvents = "none";
                                button.style.color = "#666666";
                                button.style.backgroundColor = "#cccccc";
                                button.textContent = "Request already sent";

                                const deleteButton = document.getElementById(`delete-button-${friend.id}`);
                                deleteButton.style.display = "block";
                            }
                            if (friend.id === candidateId) {
                                const button = document.getElementById(friend.id);
                                button.style.pointerEvents = "none";
                                button.style.color = "#666666";
                                button.style.backgroundColor = "#cccccc";
                                button.textContent = "Request has been sent";

                                const deleteButton = document.getElementById(`delete-button-${friend.id}`);
                                deleteButton.style.display = "block";
                            }
                        })
                    });
                });
            }
        });
    };

    const deleteFriendRequest = (event, userId, candidateId) => {
        setFindFriendsSpinner(true);
        console.log(friendsRequests);
        FriendsService.deleteFriendRequest(userId, candidateId).then((response) => {
            if (response.status === 200) {
                setFindFriendsSpinner(false);
                const newArr = [...friendsRequests];
                const foundIndex = newArr.findIndex((item) =>
                    (+item.userId === +response.data.userId && +item.candidateId === +response.data.candidateId));
                newArr.splice(foundIndex, 1);
                setFriendsRequests([...newArr], (currentArr) => {
                    console.log(currentArr);
                    foundFriends.map((friend) => {
                        currentArr.map((candidate) => {
                            if (friend.id === candidate.candidateId) {
                                const button = document.getElementById(candidate.candidateId);
                                button.style.pointerEvents = "none";
                                button.style.color = "#666666";
                                button.style.backgroundColor = "#cccccc";
                                button.textContent = "Request already sent";

                                const deleteButton = document.getElementById(`delete-button-${friend.id}`);
                                deleteButton.style.display = "block";
                            }
                        })
                    })
                });
            }

        });
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
                        {findFriendsSpinner && <Box
                        sx={{
                            display: 'flex',
                            justifyContent: "center"
                        }}>
                            <CircularProgress />
                        </Box>}
                        {!findFriendsSpinner &&
                            foundFriends.map((item, index)=> {
                                return (
                                    <div key={index} className={classes.searchResultsBlockItem}>
                                        <div className={classes.foundFriendName}>
                                            {item.nickName}
                                        </div>
                                        <div className={classes.addDeleteRequestsButtonsBlock}>
                                            <Button
                                                sx={{
                                                    variant: "contained",
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}
                                                variant="contained"
                                                id={`${item.id}`}
                                                onClick={(e) => {
                                                    addFriendRequest(e, localStorage.getItem('userId'), item.id);
                                                }}
                                            >
                                                <PersonAddIcon
                                                    sx={{
                                                        marginRight: "0.3rem"
                                                    }}
                                                /> Add to friends
                                            </Button>
                                                <IconButton
                                                    id={`delete-button-${item.id}`}
                                                    sx={{
                                                        display: "none",
                                                        marginLeft: "0.3rem",
                                                        '&:hover': {
                                                            color: "royalBlue"
                                                        }
                                                    }}
                                                    onClick={(e) => {
                                                        deleteFriendRequest(e, localStorage.getItem('userId'), item.id);
                                                    }}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                        </div>

                                    </div>
                                )
                            })
                        }
                        {emptyFoundFriendsArr && <h3 className={classes.nothingFoundMessage}>Nothing found!</h3>}
                    </div>
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
};

export default FindFriends;
