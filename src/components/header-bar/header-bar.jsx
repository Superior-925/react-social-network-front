import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import {useActions} from "../../hooks/useActions";
import classes from './header-bar.module.scss';
import FacebookLogo from "../../assets/facebook-logo.png";
import LogoutIcon from '@mui/icons-material/Logout';
import AuthService from "../../services/auth-service";
import ProfileService from "../../services/profile-service";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {useNavigate} from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {Formik} from "formik";
import TextField from "@mui/material/TextField";
import * as yup from 'yup';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {changeNickname} from "../../store/action-creators/profile";




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

const HeaderBar = (props) => {

    //const [nickname, setNickname] = useState(localStorage.getItem('userNickname'));

    useEffect(() => {
        if (nickname == null) {
            fetchNickname(localStorage.getItem('userId'));
        }
    }, []);

    const {nickname, loading, error} = useSelector(state => state.profile)

    const {changeNickname, fetchNickname} = useActions();

    const [nicknameError, setNicknameError] = useState(false);

    const validationsSchemaNick = yup.object().shape({
        nickname: yup.string().typeError('Must be a string').required('Required'),
    });

    const [anchorEl, setAnchorEl] = React.useState(null);

    const openDropdown = Boolean(anchorEl);

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const [openModal, setOpenModal] = React.useState(false);

    const handleOpenDropdown = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseDropdown = () => {
        setAnchorEl(null);
    };

    const handleClickOpenModal = () => {
        handleCloseDropdown();
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        //setNicknameError(false);
    };

    const navigate = useNavigate();

    const changeNick = (values, resetForm) => {
        changeNickname(localStorage.getItem('userId'), values.nickname).then((response) => {
            //props.changeNickname(response.data.nickname);
            props.changeNickname(response.data.nickname);
            resetForm();
        })


        //setNicknameError(false);
        // ProfileService.changeNickname(localStorage.getItem('userId'), values).then((response) => {
        //     //setNickname(response.data.nickname);
        //     localStorage.setItem("userNickname", response.data.nickname);
        //
        // },error => {
        //     if (error.response.status === 406) {
        //         setNicknameError(true);
        //     }
        // });
    };

    function logOut() {
            if (window.confirm("Are you sure you want to get out?")) {
                AuthService.logOut().then((response) => {
                    if (response.status === 200 ) {
                        AuthService.stopRefresh();
                        navigate(`/home`);
                        localStorage.clear();
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
                <div className={classes.menuButton}>
                    <IconButton
                        id="basic-button"
                        aria-controls={openDropdown ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openDropdown ? 'true' : undefined}
                        onClick={handleOpenDropdown}
                        sx={{
                            color: "royalBlue"
                        }}
                    >
                        <AccountCircleIcon/>
                    </IconButton>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openDropdown}
                        onClose={handleCloseDropdown}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClickOpenModal}>Edit my nickname</MenuItem>
                        <MenuItem onClick={logOut}>Logout</MenuItem>
                    </Menu>

                    <BootstrapDialog
                        fullWidth={fullWidth}
                        maxWidth={maxWidth}
                        onClose={handleCloseModal}
                        aria-labelledby="customized-dialog-title"
                        open={openModal}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
                            <div>Change Nickname</div>
                        </BootstrapDialogTitle>

                        <DialogContent
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                            dividers>
                            <Formik
                                initialValues={{
                                    nickname: ''
                                }}
                                validateOnBlur
                                onSubmit={(values, { resetForm }) => {changeNick(values, resetForm)}}
                                validationSchema={validationsSchemaNick}
                                validateOnChange
                            >
                                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                                    <div className={classes.changeNicknameBlock}>
                                        <TextField
                                            sx={{
                                                marginBottom: "1rem",
                                                width: "100%"
                                            }}
                                            label="Nickname"
                                            type={`text`}
                                            name={`nickname`}
                                            onBlur={handleBlur}
                                            value={values.nickname}
                                            onChange={handleChange}
                                        />

                                        {nicknameError && <p className={classes.nicknameAlreadyExist}>This nickname already exist!</p>}

                                        <Button
                                            sx={{
                                                fontSize: "1.3rem",
                                                textTransform: "none"
                                            }}
                                            variant="outlined"
                                            disabled={!isValid || !dirty}
                                            onClick={handleSubmit}
                                            type={`submit`}
                                        ><ManageAccountsIcon
                                            sx={{
                                                marginRight: "0.3rem"
                                            }}
                                        />Change nickname
                                        </Button>
                                    </div>
                                )}
                            </Formik>
                        </DialogContent>

                    </BootstrapDialog>
                </div>
            </div>
        </div>

    );
};

export default HeaderBar;
