import React, {useState, useRef, useEffect} from 'react';
import classes from './requests.module.scss';
import FriendsService from "../../api/friends-service";

import {LoadingButton} from "@mui/lab";
import Background from "../../assets/avatar.png";

const Requests = (props) => {

    const [buttonStatusAccept, setButtonStatusAccept] = React.useState(false);
    const [buttonStatusReject, setButtonStatusReject] = React.useState(false);

    const acceptRequest = () => {
        props.acceptRequest(props.userId, props.friendId, props.recordId);
        //setButtonStatusAccept(true);
    }

    const rejectRequest = () => {
        props.rejectRequest(props.recordId);
        //setButtonStatusReject(true);
    }

    const [style, setStyle] = useState({
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
            setStyle({
                marginRight: "1rem",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundImage: `url(http://localhost:3030/${props.friendId}.png)`,
                backgroundSize: "cover"
            })
        }

        if (!props.avatar) {
            setStyle({
                marginRight: "1rem",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                backgroundImage: `url(${Background})`,
                backgroundSize: "cover"
            })
        }

    }, []);

    return (
        <div className={classes.mainBlock}>
            <div className={classes.nameBlock}>
                <div style={style}/>
                <div className={classes.candidateName}>{props.name}</div>
            </div>
            <div className={classes.buttonsBlock}>
                {props.requestToMe &&
            <LoadingButton
                sx={{
                    marginRight: "0.5rem"
                }}
                size="small"
                onClick={acceptRequest}
                loading={buttonStatusAccept}
                variant="outlined"
            >
                Accept
            </LoadingButton>
                }
            <LoadingButton
                size="small"
                onClick={rejectRequest}
                loading={buttonStatusReject}
                variant="outlined"
            >
                {props.deleteRequest}
            </LoadingButton>
            </div>
        </div>
    );
}

export default Requests;
