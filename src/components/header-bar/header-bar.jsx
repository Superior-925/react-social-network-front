import React, {useState} from 'react';
import classes from './header-bar.module.scss';
import FacebookLogo from "../../assets/facebook-logo.png";
import LogoutIcon from '@mui/icons-material/Logout';
import AuthService from "../../services/auth-service";
import {useNavigate} from "react-router-dom";

const HeaderBar = (props) => {

    // const [nickname, setCount] = useState(100);

    const navigate = useNavigate();

    const nickname = localStorage.getItem('userNickname');

    function logOut() {
            if (window.confirm("Are you sure you want to get out?")) {
                AuthService.logOut().then((response) => {
                    if (response.status === 200 ) {
                        AuthService.stopRefresh();
                        navigate(`/home`);
                    }
                })
            }
    }

    return (
        <div className={classes.headerBarWrapper}>
                <img className={classes.titleLogoImg} src={FacebookLogo} alt="facebook-logo"/>
            <div className={classes.leftsideBlock}>
                <div className={classes.userNickname}>
                    {nickname}
                </div>
                <div className={classes.logoutButton}>
                    <LogoutIcon color="primary"
                                fontSize="large"
                                sx={{
                                    '&:hover': {
                                        color: "black"
                                    }
                                }}
                                onClick={logOut}
                    >
                    </LogoutIcon>
                </div>
            </div>
        </div>

    );
};

export default HeaderBar;
