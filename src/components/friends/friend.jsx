import React, {useState, useRef, useEffect} from 'react';
import classes from './friend.module.scss';
import {useNavigate} from "react-router-dom";
import FriendsService from "../../api/friends-service";

import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import Background from "../../assets/avatar.png";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Avatar from '@mui/material/Avatar';
import {useActions} from "../../hooks/useActions";
import {Tooltip} from "@mui/material";

const Friend = (props) => {

    const navigate = useNavigate();

    const {setPagePath} = useActions();

    const [avatar, setAvatar] = useState({
        marginRight: "1rem",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover"
    });

    useEffect(() => {

        console.log(props.friendId);

        if (props.avatar) {
            setAvatar({
                marginRight: "1rem",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundImage: `url(http://localhost:3030/${props.friendId}.png)`,
                backgroundSize: "cover"
            })
        }

        if (!props.avatar) {
            setAvatar({
                marginRight: "1rem",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundImage: `url(${Background})`,
                backgroundSize: "cover"
            })
        }

    }, []);

    const goToFriendPage = () => {
        setPagePath(props.friendId);
        navigate(`/main/user/id/${props.friendId}`);
    }

    const openChat = () => {
        props.chatDialogOpen(props.userId, props.friendId, props.name);
        // props.acceptRequest(props.userId, props.friendId, props.recordId);
        // //setButtonStatusAccept(true);
    }

    const deleteFriend = () => {
        if (window.confirm('Are you sure you want delete this friend?')) {

        }
    }

    return (
        <div className={classes.mainBlock}>
            <div className={classes.nameBlock}>
                <div style={avatar} className={classes.friendAvatar} onClick={goToFriendPage}/>
                <div className={classes.friendName} onClick={goToFriendPage}>{props.name}</div>
            </div>
            <div className={classes.buttonsBlock}>
                <Tooltip title="Chat with friend">
                    <IconButton
                        color="primary"
                        onClick={openChat}
                        sx={{
                            marginRight:'1rem'
                        }}
                    >
                        <ChatIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete friend">
                    <IconButton
                        onClick={deleteFriend}
                    >
                        <PersonRemoveIcon/>
                    </IconButton>
                </Tooltip>
                {/*<Button*/}
                {/*    sx={{*/}
                {/*        width: "22%",*/}
                {/*        display: "flex",*/}
                {/*        justifyContent: "center",*/}
                {/*        alignItems: "center",*/}
                {/*        fontSize: "1rem",*/}
                {/*        textTransform: "none",*/}
                {/*        marginRight: "0.7rem"*/}
                {/*    }}*/}
                {/*    size="small"*/}
                {/*    variant="outlined"*/}
                {/*    onClick={showHideModules}*/}
                {/*><EditIcon*/}
                {/*    sx={{*/}
                {/*        marginRight: "0.3rem"*/}
                {/*    }}*/}
                {/*/>Edit post*/}
                {/*</Button>*/}

                {/*//{props.requestToMe &&*/}
                {/*// <LoadingButton*/}
                {/*//     sx={{*/}
                {/*//         marginRight: "0.5rem"*/}
                {/*//     }}*/}
                {/*//     size="small"*/}
                {/*//     onClick={acceptRequest}*/}
                {/*//     loading={buttonStatusAccept}*/}
                {/*//     variant="outlined"*/}
                {/*// >*/}
                {/*//     Accept*/}
                {/*// </LoadingButton>*/}
                {/*// }*/}
                {/*// <LoadingButton*/}
                {/*//     size="small"*/}
                {/*//     onClick={rejectRequest}*/}
                {/*//     loading={buttonStatusReject}*/}
                {/*//     variant="outlined"*/}
                {/*// >*/}
                {/*//     {props.deleteRequest}*/}
                {/*// </LoadingButton>*/}
            </div>
        </div>
    );
}

export default Friend;
