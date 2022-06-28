import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";

import {useActions} from "../../hooks/useActions";
import classes from './header-bar.module.scss';
import FacebookLogo from "../../assets/facebook-logo.png";
import AuthService from "../../services/auth-service";
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
import {Formik} from "formik";
import TextField from "@mui/material/TextField";
import * as yup from 'yup';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import {changeNickname} from "../../store/action-creators/profile";
import {ListItemIcon} from "@mui/material";
import {Logout, Settings} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";




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

    useEffect(() => {
        if (nickname == null) {
            fetchNickname(localStorage.getItem('userId'));
        }
    }, []);

    const {nickname, loading, error} = useSelector(state => state.profile)

    const {changeNickname, fetchNickname} = useActions();

    const validationsSchemaNick = yup.object().shape({
        nickname: yup.string().typeError('Must be a string').required('Required'),
    });

    const [anchorEl, setAnchorEl] = React.useState(null);

    const openDropdown = Boolean(anchorEl);

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const [openModal, setOpenModal] = React.useState(false);



    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
    };

    const navigate = useNavigate();

    const changeNick = (values, resetForm) => {
        changeNickname(localStorage.getItem('userId'), values.nickname).then((response) => {
            resetForm();
        })
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
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{
                            color: "royalBlue"
                        }}
                    >
                        <AccountCircleIcon/>
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClickOpenModal}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Profile settings
                        </MenuItem>
                        <MenuItem onClick={logOut}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
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

                                        {error && <p className={classes.nicknameError}>{error}</p>}
                                        {loading && <div className={classes.loadingSpinner}><CircularProgress /></div>}

                                        <LoadingButton
                                            sx={{
                                            fontSize: "1.3rem",
                                            textTransform: "none"
                                            }}
                                            size="small"
                                            onClick={handleSubmit}
                                            loading={loading}
                                            loadingIndicator="Changing..."
                                            variant="outlined"
                                            disabled={!isValid || !dirty}
                                        >
                                            Change nickname
                                        </LoadingButton>
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
