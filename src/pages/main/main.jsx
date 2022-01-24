import React, {useContext, useState} from 'react';
import classes from './main.module.scss'
import Container from '@mui/material/Container';
import FacebookLogo from "../../assets/facebook-logo.png";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AuthService from "../../services/auth-service";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import HeaderBar from "../../components/header-bar/header-bar"
import LeftSideBar from "../../components/left-bar/left-side-bar";
import Posts from "../../components/posts/posts";

function Main() {

    return (
        <div>
                <Container
                    maxWidth="lg"
                    sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
                >
                    <HeaderBar/>
                    <div className={classes.contentWrapper}>
                        <LeftSideBar/>
                        <div className={classes.mainContent}>
                            <Posts/>
                        </div>
                    </div>
                    
                </Container>
        </div>
    );
};

export default Main;
