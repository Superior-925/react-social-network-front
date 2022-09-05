import React, {useState} from 'react';
import classes from './left-side-bar.module.scss';
import {useNavigate} from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from "../avatar-block/avatar";
import {useActions} from "../../hooks/useActions";
import {setPagePath} from "../../store/action-creators/page-path";

const LeftSideBar = (props) => {

    const {setOwnerTrue} = useActions();

    const navigate = useNavigate();

    const {setPagePath} = useActions();

    function goToMyPage() {
            setPagePath(localStorage.getItem("userId"));
            setOwnerTrue();
            navigate(`/main/user/id/${localStorage.getItem("userId")}`);
    }

    function goToFriendsPage() {
        setPagePath(localStorage.getItem("userId"));
        setOwnerTrue();
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
