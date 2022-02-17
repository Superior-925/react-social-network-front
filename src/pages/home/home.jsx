import React, {useContext, useState} from 'react';
import classes from './home.module.scss'
import FacebookLogo from "../../assets/facebook-logo.png";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AuthService from "../../services/auth-service";

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom";
import { Formik } from 'formik';
import * as yup from 'yup';

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

function Home() {

    const navigate = useNavigate();

    const [emailOrPasswordIncorrect, setEmailOrPasswordIncorrect] = useState(false);

    const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);

    const logIn = (data) => {
        setEmailOrPasswordIncorrect(false);
        AuthService.logIn(data).then((response) => {
            if (response.status === 200 ) {
                AuthService.setLocalStorageData(response.data.userId, response.data.userNickname, response.data.token, response.data.refresh.token);
                AuthService.startRefresh();
                navigate(`/main/user/id/${response.data.userId}`);
            }
        },error => {
            if (error.response.status === 401) {
                setEmailOrPasswordIncorrect(true);
            }
        });
    };

    const signUp = (data) => {
        setEmailAlreadyExist(false);
        console.log(data);
        AuthService.signUp(data).then((response) => {
            console.log(response);
            if (response.status === 200 ) {
                AuthService.setLocalStorageData(response.data.userId, response.data.userNickname, response.data.token, response.data.refresh.token);
                AuthService.startRefresh();
                navigate(`/main/user/id/${response.data.userId}`);
            }
        },error => {
            if (error.response.status === 409) {
                setEmailAlreadyExist(true);
            }
        });
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const validationsSchemaLogin = yup.object().shape({
        password: yup.string().typeError('Must be a string').required('Required').min(6, 'Password must be longer than or equal to six characters'),
        email: yup.string().email('Please enter a valid email').required('Required'),
    });

    const validationsSchemaSignUp = yup.object().shape({
        password: yup.string().typeError('Must be a string').required('Required').min(6, 'Password must be longer than or equal to six characters'),
        email: yup.string().email('Please enter a valid email').required('Required'),
        nickname: yup.string().required('Required'),
    });

    return (
        <div>
            <div className={classes.container}>
                <div className={classes.titleWrapper}>
                <div className={classes.titleLogo}>
                    <img className={classes.titleLogoImg} src={FacebookLogo} alt="facebook-logo"/>
                </div>
                <div className={classes.titleText}>
                    Facebook helps you connect and share with the people in your life.
                </div>
                </div>

                <div className={classes.formLoginWrapper}>
                    <Formik
                        initialValues={{
                            password: '',
                            email: '',
                        }}
                        validateOnBlur
                        onSubmit={(values) => {logIn(values)}}
                        validationSchema={validationsSchemaLogin}
                        validateOnChange
                    >

                        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                            <div className={classes.formLogin}>
                            <TextField
                                sx={{
                                    marginBottom: "1rem"
                                }}
                                id="outlined-email-input"
                                label="Email"
                                type={`email`}
                                name={`email`}
                                onBlur={handleBlur}
                                value={values.email}
                                autoComplete="current-email"
                                onChange={handleChange}
                                // onChange={(e) =>
                                // {setAuthData({...authData, email: e.target.value})}}
                            />
                                {touched.email && errors.email && <p className={classes.error}>{errors.email}</p>}
                            <TextField
                            sx={{
                            marginBottom: "1rem"
                        }}
                            id="outlined-password-input"
                            label="Password"
                            autoComplete="current-password"
                            type={`password`}
                            name={`password`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            // onChange={e => setAuthData({...authData, password: e.target.value})}
                            />
                            {touched.password && errors.password && <p className={classes.error}>{errors.password}</p>}
                            <Button
                            sx={{
                            fontSize: "1.3rem",
                            textTransform: "none"
                        }}
                            variant="contained"
                            disabled={!isValid || !dirty}
                            onClick={handleSubmit}
                            type={`submit`}
                            >Log In
                            </Button>
                            </div>
                            )}

                    </Formik>
                    <div>
                        {emailOrPasswordIncorrect && <p className={classes.errorIncorrectDataLogin}>Email or login is incorrect!</p>}
                    </div>
                    <div className={classes.breakLine}>
                    </div>

                    <Button
                        sx={{
                            fontSize: "1.3rem",
                            textTransform: "none",
                            backgroundColor: "limegreen",
                            '&:hover': {
                                backgroundColor: "green"
                            }
                        }}
                        variant="contained"
                        onClick={handleClickOpen}
                    >Create New Account</Button>


                    <BootstrapDialog
                        fullWidth={fullWidth}
                        maxWidth={maxWidth}
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                <div>Sign Up</div>
                                <div className={classes.modalSubTitle}>It's quick and easy.</div>
                        </BootstrapDialogTitle>
                        <DialogContent
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                            dividers>
                            <Formik
                                initialValues={{
                                    password: '',
                                    email: '',
                                    nickname: '',
                                }}
                                validateOnChange
                                onSubmit={(values) => { signUp(values)}}
                                validationSchema={validationsSchemaSignUp}
                            >

                                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                                    <div className={classes.formLogin}>
                                        <TextField
                                            sx={{
                                                marginBottom: "1rem"
                                            }}
                                            label="Email"
                                            type={`email`}
                                            name={`email`}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            autoComplete="current-email"
                                            onChange={handleChange}
                                            // onChange={(e) =>
                                            // {setAuthData({...authData, email: e.target.value})}}
                                        />
                                        {touched.email && errors.email && <p className={classes.error}>{errors.email}</p>}
                                        <TextField
                                            sx={{
                                                marginBottom: "1rem"
                                            }}
                                            label="Password"
                                            autoComplete="current-password"
                                            type={`password`}
                                            name={`password`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            // onChange={e => setAuthData({...authData, password: e.target.value})}
                                        />
                                        {touched.password && errors.password && <p className={classes.error}>{errors.password}</p>}
                                        <TextField
                                            sx={{
                                                marginBottom: "1rem"
                                            }}
                                            label="Nickname"
                                            type={`string`}
                                            name={`nickname`}
                                            onBlur={handleBlur}
                                            value={values.nickname}
                                            onChange={handleChange}
                                            // onChange={(e) =>
                                            // {setAuthData({...authData, email: e.target.value})}}
                                        />
                                        {touched.nickname && errors.nickname && <p className={classes.error}>{errors.nickname}</p>}
                                        <div>
                                            {emailAlreadyExist && <p className={classes.errorEmailAlreadyExist}>This email already exist!!</p>}
                                        </div>
                                        <Button
                                            sx={{
                                                fontSize: "1.3rem",
                                                textTransform: "none"
                                            }}
                                            variant="contained"
                                            disabled={!isValid || !dirty}
                                            onClick={handleSubmit}
                                            type={`submit`}
                                        >Sign Up
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

export default Home;
