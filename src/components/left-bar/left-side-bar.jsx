import React, {useState} from 'react';
import classes from './left-side-bar.module.scss';
import {useNavigate} from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from "../avatar-block/avatar";

const LeftSideBar = (props) => {

    const navigate = useNavigate();

    function goToMyPage() {
        navigate(`/main/user/id/${localStorage.getItem("userId")}`);
    }

    function goToFriendsPage() {
        navigate(`/friends/user/id/${localStorage.getItem("userId")}`);
    }

    return (
        <div className={classes.leftSideBarWrapper}>
            <Avatar/>
            <button type={"button"} className={classes.myPageButton} onClick={goToMyPage}>
                <PersonIcon fontSize="large" color="primary"/> <span className={classes.buttonText}>My page</span>
            </button>
            <button type={"button"} className={classes.friendsPageButton} onClick={goToFriendsPage}>
                <GroupIcon fontSize="large" color="primary"/> <span className={classes.buttonText}>My friends</span>
            </button>
        </div>

    );
};

export default LeftSideBar;