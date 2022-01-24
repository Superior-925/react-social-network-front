import React, {useContext, useState} from 'react';
import classes from "./friends.module.scss"
import Container from '@mui/material/Container';
import FacebookLogo from "../../assets/facebook-logo.png";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AuthService from "../../services/auth-service";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import HeaderBar from "../../components/header-bar/header-bar"
import LeftSideBar from "../../components/left-bar/left-side-bar";

function Friends() {

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
                <LeftSideBar/>
                <div className="asd">
                    Friends page works!
                </div>
            </Container>
        </div>
    );
};

export default Friends;
