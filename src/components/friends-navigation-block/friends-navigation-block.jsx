import React, {useState, useRef, useEffect} from 'react';
import classes from './friends-navigation-block.module.scss';
import Box from "@mui/material/Box";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import FindFriends from "../../components/find-friends/find-friends";
import FriendsService from "../../api/friends-service";
import Requests from "../requests/requests";
import Friend from "../friends/friend";
import {DialogChat} from "../chat-dialog/chat-dialog";
import CircularProgress from "@mui/material/CircularProgress";
import Background from "../../assets/avatar.png";

const FriendsNavigationBlock = (props) => {

    const [spinner, setSpinner] = React.useState(false);

    const [friendRequests, setFriendsRequests] = React.useState({});

    const [friendsArr, setFriendsArr] = React.useState([]);

    const [friendsRequestsArr, setFriendsRequestsArr] = React.useState([]);

    const [candidatesRequestsArr, setCandidatesRequestsArr] = React.useState([]);

    const [value, setValue] = React.useState('1');

    const getFriends = () => {
        FriendsService.getFriends(localStorage.getItem('userId')).then((response)=>{
            console.log(response);

            const friends = [];

            response.data.friends.forEach((item) => {
                const friend = {
                    userId: response.data._id,
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

    useEffect(() => {
        getFriends();
    }, []);

    const handleChange = (event, newValue) => {
        setFriendsRequestsArr([]);
        setCandidatesRequestsArr([]);
        setFriendsArr([]);

        setValue(newValue);

        if (newValue === '2') {
            setSpinner(true);
            FriendsService.getFriendRequests(localStorage.getItem('userId')).then((response) => {
                setSpinner(false);
                //array of my requests to friends
                const friendsRequests = [];
                //array of requests to me
                const candidatesRequests = [];

                //array of requests to me
                response.data.candidates.forEach((candidate) => {
                    const candidateRequest = {
                        id: candidate._id,
                        userId: candidate.candidateId, //Its I
                        candidateId: candidate.userId._id,
                        avatar: candidate.userId.avatar,
                        email: candidate.userId.email,
                        nickname: candidate.userId.nickname
                    };
                    candidatesRequests.push(candidateRequest);
                });

                //array of my requests
                response.data.requests.forEach((request) => {
                    const candidateRequest = {
                        id: request._id,
                        userId: request.userId, //Its I
                        candidateId: request.candidateId._id,
                        avatar: request.candidateId.avatar,
                        email: request.candidateId.email,
                        nickname: request.candidateId.nickname
                    };
                    friendsRequests.push(candidateRequest);
                })

                setFriendsRequestsArr([...friendsRequests]);

                setCandidatesRequestsArr([...candidatesRequests])
            });
        }
        if (newValue === '1') {
            getFriends();
        }
    };



    const acceptRequestHandler = (userId, friendId, requestRecordId) => {
        console.log("UserId "+userId);
        console.log("FriendId"+friendId);
        console.log(requestRecordId);

        FriendsService.addFriend(userId, friendId, requestRecordId).then((response) => {

            const newFriendsRequestsArr = [...friendsRequestsArr];

            const filteredFriendsRequestsArr = newFriendsRequestsArr.filter((item) => {
                return item.id !== response.data._id;
            });

            setFriendsRequestsArr([...filteredFriendsRequestsArr]);


            const newCandidatesRequestsArr = [...candidatesRequestsArr];
            const filteredCandidatesRequestsArr = newCandidatesRequestsArr.filter((item) => {
                return item.id !== response.data._id;
            });

            setCandidatesRequestsArr([...filteredCandidatesRequestsArr]);
        })
    }

    const rejectRequestHandler = (requestRecordId) => {
        console.log(requestRecordId);

        FriendsService.deleteFriendRequest(requestRecordId).then((response) => {
            //setSpinner(false);
            //console.log(friendsRequests);
            //console.log(response);

            const newFriendsRequestsArr = [...friendsRequestsArr];

            const filteredFriendsRequestsArr = newFriendsRequestsArr.filter((item) => {
                return item.id !== response.data._id;
            });

            setFriendsRequestsArr([...filteredFriendsRequestsArr]);


            const newCandidatesRequestsArr = [...candidatesRequestsArr];
            const filteredCandidatesRequestsArr = newCandidatesRequestsArr.filter((item) => {
                return item.id !== response.data._id;
            });

            setCandidatesRequestsArr([...filteredCandidatesRequestsArr]);

            console.log(friendsRequestsArr);
            console.log(candidatesRequestsArr);



            //const requests = {friendsRequestsArr, candidatesRequestsArr};

            // setFriendsRequests(requests, (requestsArr) => {
            //
            //     console.log(requestsArr);
            //     const deleteButton = document.getElementById(`delete-button-${candidateId}`);
            //     deleteButton.style.display = "none";
            //
            //     const addToFriendsButton = document.getElementById(`add-to-friends-button-${candidateId}`);
            //     addToFriendsButton.style.display = "block";
            //
            //     const addToFriendsButtonDisabled = document.getElementById(`add-to-friends-button-disabled-${candidateId}`);
            //     addToFriendsButtonDisabled.style.display = "none";
            //
            // });

        });

    }

    const childRef = useRef();

    const onOpenHandler = (userId, friendId, friendNickname) => {
        // console.log("User Id" + userId);
        // console.log("FriendId" + friendId);
        // console.log(friendNickname);
        childRef.current.handleClickOpen(friendNickname)
    }

    return (
        <React.Fragment>
            <Box sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center'}}>
                        <TabList onChange={handleChange} aria-label="friends tabs">
                            <Tab icon={<GroupOutlinedIcon/>} label="My friends" value="1"/>
                            <Tab icon={<GroupAddOutlinedIcon/>} label="Requests" value="2"/>
                            <Tab icon={<PersonSearchOutlinedIcon/>} label="Find friends" value="3"/>
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <DialogChat ref={childRef}/>
                        {
                            friendsArr ? <div
                                    className={classes.requestsBlockContent}>{!spinner && friendsArr.map((item, index) => {
                                    return (
                                        <Friend
                                            key={index}
                                            avatar={item.avatar}
                                            userId={item.userId}
                                            friendId={item.friendId}
                                            name={item.nickname}
                                            chatDialogOpen={onOpenHandler}
                                        />
                                    )
                                })}</div>
                                : null
                        }
                    </TabPanel>
                    <TabPanel value="2">
                        <div className={classes.requestsBlock}>
                            {spinner && <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: "center"
                                }}>
                                <CircularProgress/>
                            </Box>}
                            <div className={classes.requestsBlock}>
                                {
                                    friendsRequestsArr.length === 0 && candidatesRequestsArr.length === 0 &&
                                    <div className={classes.requestsBlockTitle}>
                                        No requests
                                    </div>
                                }
                                {
                                    friendsRequestsArr.length === 0 && candidatesRequestsArr.length === 0 &&
                                    <hr className={classes.breakLine}/>
                                }
                                {
                                    friendsRequestsArr.length > 0 &&
                                    <div className={classes.requestsBlockTitle}>
                                        My requests to friends
                                    </div>
                                }
                                {
                                    friendsRequestsArr.length > 0 &&
                                    <hr className={classes.breakLine}/>
                                }
                                {
                                    friendsRequestsArr ? <div
                                            className={classes.requestsBlockContent}>{!spinner && friendsRequestsArr.map((item, index) => {
                                            return (
                                                <Requests
                                                    key={index}
                                                    name={item.nickname}
                                                    recordId={item.id}
                                                    userId={item.userId}
                                                    friendId={item.candidateId}
                                                    avatar={item.avatar}
                                                    rejectRequest={rejectRequestHandler}
                                                    requestToMe={false}
                                                    deleteRequest={"Delete request"}
                                                />
                                            )
                                        })}</div>
                                        : null
                                }
                            </div>

                            <div className={classes.requestsBlock}>
                                {
                                    candidatesRequestsArr.length > 0 &&
                                    <div className={classes.requestsBlockTitle}>
                                        Requests to me to friends
                                    </div>
                                }
                                {
                                    candidatesRequestsArr.length > 0 &&
                                    <hr className={classes.breakLine}/>
                                }
                                {/*<div className={classes.requestsBlockTitle}>*/}
                                {/*    Requests to me to friends*/}
                                {/*</div>*/}
                                {/*<hr className={classes.breakLine}/>*/}
                                {
                                    candidatesRequestsArr ? <div
                                            className={classes.requestsBlockContent}>{!spinner && candidatesRequestsArr.map((item, index) => {
                                            return (
                                                <Requests
                                                    key={index}
                                                    name={item.nickname}
                                                    recordId={item.id}
                                                    userId={item.userId}
                                                    friendId={item.candidateId}
                                                    avatar={item.avatar}
                                                    acceptRequest={acceptRequestHandler}
                                                    rejectRequest={rejectRequestHandler}
                                                    requestToMe={true}
                                                    deleteRequest={"Reject"}
                                                />
                                            )
                                        })}</div>
                                        : null
                                }
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="3"><FindFriends/></TabPanel>
                </TabContext>
            </Box>
        </React.Fragment>
    );

}

export default FriendsNavigationBlock;
