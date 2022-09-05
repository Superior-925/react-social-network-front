import React, {useState, useRef, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import classes from './find-friends.module.scss';
import PeopleIcon from '@mui/icons-material/People';
import {Formik} from 'formik';
import * as yup from 'yup';
import Button from "@mui/material/Button";
import FriendsService from "../../api/friends-service";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import PersonOffIcon from '@mui/icons-material/PersonOff';

import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import {useStateWithCallbackLazy} from 'use-state-with-callback';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
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
                    <CloseIcon/>
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
        //fetchFriendsRequests(localStorage.getItem('userId'));
        // FriendsService.getFriendRequests(localStorage.getItem('userId')).then((response) => {
        //     const friendRequestArr = [];
        //     // response.data.iCandidate.forEach((item) => {
        //     //     const requestToMe = {userId: item.userId, candidateId: item.candidateId};
        //     //     friendRequestArr.push(requestToMe);
        //     // });
        //     // setFriendsRequests([...friendRequestArr], (current) => {});
        // });
    }, []);

    const {fetchFriendsRequests} = useActions()

    const {requests, fetchRequestsStatus} = useSelector(state => state.request);

    const [friendsRequests, setFriendsRequests] = useStateWithCallbackLazy({});

    const [emptyFoundFriendsArr, setEmptyFoundFriendsArr] = React.useState(false);

    const [spinner, setSpinner] = React.useState(false);

    const [foundCandidates, setFoundCandidates] = useStateWithCallbackLazy([]);

    const [friendsArr, setFriendsArr] = useStateWithCallbackLazy([]);

    const [open, setOpen] = React.useState(false);

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const getFriends = () => {
        FriendsService.getFriends(localStorage.getItem('userId')).then((response)=>{
            console.log(response);

            const friends = [];

            response.data.friends.forEach((item) => {
                const friend = {
                    friendId: item._id,
                    avatar: item.avatar,
                    email: item.email,
                    nickname: item.nickname
                };
                friends.push(friend);
            });
            setFriendsArr([...friends]);
        })
    }

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
        setSpinner(true);
        FriendsService.getFriends(localStorage.getItem('userId')).then((response)=>{
            console.log(response);

            const friends = [];

            response.data.friends.forEach((item) => {
                const friend = {
                    friendId: item._id,
                    avatar: item.avatar,
                    email: item.email,
                    nickname: item.nickname
                };
                friends.push(friend);
            });
            setFriendsArr([...friends], (friendsCurrentArr) => {
                // friendsArr.map((friend) => {
                //     if (friend.friendId === foundPerson.id) {
                //         const addToFriendsButton = document.getElementById(`add-to-friends-button-disabled-${foundPerson.id}`);
                //         addToFriendsButton.style.pointerEvents = "none";
                //         addToFriendsButton.style.color = "#666666";
                //         addToFriendsButton.style.backgroundColor = "#cccccc";
                //         addToFriendsButton.textContent = "It's your friend";
                //     }
                // })
                FriendsService.findFriends(values.friendName, friendsIgnoreIds).then((response) => {

                    const foundPersons = [];
                    response.data.forEach((item) => {
                        const candidate = {nickName: item.nickname, email: item.email, id: item._id};
                        foundPersons.push(candidate);
                    });
                    if (!foundPersons.length) {
                        setEmptyFoundFriendsArr(true)
                    }
                    if (foundPersons.length) {
                        setEmptyFoundFriendsArr(false)
                    }
                    setSpinner(false);
                    setFoundCandidates([...foundPersons], (foundPersonsCurrentArr) => {
                        resetForm();

                        FriendsService.getFriendRequests(localStorage.getItem('userId')).then((response) => {

                            console.log(response);
                            //array of my requests to friends
                            const friendsRequestsArr = [];
                            //array of requests to me
                            const candidatesRequestsArr = [];
                            response.data.candidates.forEach((candidate) => {
                                const candidateRequest = {
                                    id: candidate._id,
                                    userId: candidate.candidateId,
                                    candidateId: candidate.userId._id
                                };
                                candidatesRequestsArr.push(candidateRequest);
                            });
                            response.data.requests.forEach((request) => {
                                const friendRequest = {
                                    id: request._id,
                                    candidateId: request.candidateId._id,
                                    userId: request.userId
                                };
                                friendsRequestsArr.push(friendRequest);
                            })
                            const requests = {friendsRequestsArr, candidatesRequestsArr}
                            setFriendsRequests(requests, (requestsArr) => {
                                console.log(foundPersonsCurrentArr);
                                console.log(requestsArr);
                                foundPersonsCurrentArr.map((foundPerson) => {
                                    const addToFriendsButton = document.getElementById(`add-to-friends-button-${foundPerson.id}`);
                                    addToFriendsButton.style.display = "none";

                                    friendsCurrentArr.map((friend) => {
                                        if (friend.friendId === foundPerson.id) {
                                                    const addToFriendsButton = document.getElementById(`add-to-friends-button-disabled-${foundPerson.id}`);
                                                    addToFriendsButton.style.pointerEvents = "none";
                                                    addToFriendsButton.style.color = "#666666";
                                                    addToFriendsButton.style.backgroundColor = "#cccccc";
                                                    addToFriendsButton.textContent = "It's your friend";
                                                }
                                    })

                                    requestsArr.candidatesRequestsArr.map((recievedRequest) => {
                                        if (foundPerson.id === recievedRequest.candidateId) {
                                            const addToFriendsButton = document.getElementById(`add-to-friends-button-disabled-${recievedRequest.candidateId}`);
                                            addToFriendsButton.style.pointerEvents = "none";
                                            addToFriendsButton.style.color = "#666666";
                                            addToFriendsButton.style.backgroundColor = "#cccccc";
                                            addToFriendsButton.textContent = "Request to me to friends";
                                            const deleteButton = document.getElementById(`delete-button-${foundPerson.id}`);
                                            deleteButton.style.display = "block";
                                        }
                                    })
                                    requestsArr.friendsRequestsArr.map((sentRequest) => {
                                        if (foundPerson.id === sentRequest.candidateId) {
                                            const addToFriendsButton = document.getElementById(`add-to-friends-button-disabled-${sentRequest.candidateId}`);
                                            addToFriendsButton.style.pointerEvents = "none";
                                            addToFriendsButton.style.color = "#666666";
                                            addToFriendsButton.style.backgroundColor = "#cccccc";
                                            if (sentRequest.userId === localStorage.getItem('userId')) {
                                                addToFriendsButton.textContent = "Request already sent";
                                            }
                                            const deleteButton = document.getElementById(`delete-button-${foundPerson.id}`);
                                            deleteButton.style.display = "block";
                                        }
                                    })
                                })
                            });
                        });
                    });
                });
            });
        })



    };

    const sendFriendRequest = (event, userId, candidateId) => {
        setSpinner(true);
        FriendsService.addFriendRequest(userId, candidateId).then((response) => {
            if (response.status === 200) {
                console.log(response);
                setSpinner(false);
                const friendRequest = {id: response.data._id, userId: response.data.userId, candidateId: response.data.candidateId};
                const friendsRequestsArr = [...friendsRequests.friendsRequestsArr];
                friendsRequestsArr.push(friendRequest);
                const candidatesRequestsArr = [...friendsRequests.candidatesRequestsArr];
                const requests = {friendsRequestsArr, candidatesRequestsArr};

                setFriendsRequests(requests, (requestsArr) => {
                    console.log(requestsArr);
                    foundCandidates.map((foundPerson) => {
                        const addToFriendsButton = document.getElementById(`add-to-friends-button-${foundPerson.id}`);
                        addToFriendsButton.style.display = "none";

                        requestsArr.candidatesRequestsArr.map((recievedRequest) => {
                            if (foundPerson.id === recievedRequest.candidateId) {
                                const button = document.getElementById(`add-to-friends-button-disabled-${recievedRequest.userId}`);
                                button.style.pointerEvents = "none";
                                button.style.color = "#666666";
                                button.style.backgroundColor = "#cccccc";
                                button.textContent = "Request to me to friends";
                                // if (recievedRequest.candidateId === localStorage.getItem('userId')) {
                                //     button.textContent = "Request to friends";
                                // }
                                const deleteButton = document.getElementById(`delete-button-${foundPerson.id}`);
                                deleteButton.style.display = "block";
                            }
                        })
                        requestsArr.friendsRequestsArr.map((sentRequest) => {
                            if (foundPerson.id === sentRequest.candidateId) {
                                const button = document.getElementById(`add-to-friends-button-disabled-${sentRequest.candidateId}`);
                                button.style.pointerEvents = "none";
                                button.style.color = "#666666";
                                button.style.backgroundColor = "#cccccc";
                                if (sentRequest.userId === localStorage.getItem('userId')) {
                                    button.textContent = "Request already sent";
                                }
                                // if (sentRequest.candidateId === localStorage.getItem('userId')) {
                                //     button.textContent = "Request to friends";
                                // }
                                const deleteButton = document.getElementById(`delete-button-${foundPerson.id}`);
                                deleteButton.style.display = "block";
                            }
                        })
                    });
                });
            }
        });
    };

    const deleteFriendRequest = (event, userId, candidateId) => {

        console.log(userId);
        console.log(candidateId);

        console.log(friendsRequests);

        //setSpinner(true);
        let requestId;
        if (friendsRequests.friendsRequestsArr.length) {
            friendsRequests.friendsRequestsArr.find((item) => {
                if (userId === item.userId && candidateId === item.candidateId) {
                    requestId = item.id
                }
            })
        }
        if (friendsRequests.candidatesRequestsArr.length) {
            friendsRequests.candidatesRequestsArr.find((item) => {
                if (userId === item.userId && candidateId === item.candidateId) {
                    requestId = item.id
                }
            })
        }
        FriendsService.deleteFriendRequest(requestId).then((response) => {
            //setSpinner(false);
            console.log(friendsRequests);
            console.log(response);

            const newFriendsRequestsArr = [...friendsRequests.friendsRequestsArr];
            const friendsRequestsArr = newFriendsRequestsArr.filter((item) => {
                return item.id !== response.data._id;
            });


            const newCandidatesRequestsArr = [...friendsRequests.candidatesRequestsArr];
            const candidatesRequestsArr = newCandidatesRequestsArr.filter((item) => {
                return item.id !== response.data._id;
            });

            console.log(friendsRequestsArr);
            console.log(candidatesRequestsArr);

            const requests = {friendsRequestsArr, candidatesRequestsArr};

            setFriendsRequests(requests, (requestsArr) => {

                console.log(requestsArr);
                const deleteButton = document.getElementById(`delete-button-${candidateId}`);
                deleteButton.style.display = "none";

                const addToFriendsButton = document.getElementById(`add-to-friends-button-${candidateId}`);
                addToFriendsButton.style.display = "block";

                const addToFriendsButtonDisabled = document.getElementById(`add-to-friends-button-disabled-${candidateId}`);
                addToFriendsButtonDisabled.style.display = "none";

            });

        });
    }

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    friendName: ''
                }}
                validateOnBlur
                onSubmit={(values, {resetForm}) => {
                    findFriends(values, resetForm)
                }}
                validationSchema={validationSchema}
                validateOnChange
            >
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
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
                            <CircularProgress/>
                        </Box>}
                        {!spinner &&
                        foundCandidates.map((item, index) => {
                            return (
                                <div key={index} className={classes.searchResultsBlockItem}>
                                    <div className={classes.foundPersonName}>
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
                                            id={`add-to-friends-button-disabled-${item.id}`}
                                            onClick={(e) => {
                                                sendFriendRequest(e, localStorage.getItem('userId'), item.id);
                                            }}
                                        >
                                            <PersonAddIcon
                                                sx={{
                                                    marginRight: "0.3rem"
                                                }}
                                            /> Add to friends
                                        </Button>

                                        <Button
                                            sx={{
                                                variant: "contained",
                                                display: "flex",
                                                alignItems: "center"
                                            }}
                                            variant="contained"
                                            id={`add-to-friends-button-${item.id}`}
                                            onClick={(e) => {
                                                sendFriendRequest(e, localStorage.getItem('userId'), item.id);
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
