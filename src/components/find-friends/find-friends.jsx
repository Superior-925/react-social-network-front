import React from 'react';
import TextField from '@mui/material/TextField';
import classes from './find-friends.module.scss';
import PeopleIcon from '@mui/icons-material/People';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from "@mui/material/Button";
import PostService from "../../services/post-service";
import EditIcon from "@mui/icons-material/Edit";

const FindFriends = (props) => {

    const validationSchema = yup.object().shape({
        friendName: yup.string().required('Required'),
    });

    function createPost(values, resetForm) {
        console.log(values);
        resetForm();
        // PostService.createPost(localStorage.getItem('userId'), values).then((response) => {
        //     props.onCreatePost(response.data.postText, response.data._id);
        //     resetForm();
        // })
    }

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    friendName: ''
                }}
                validateOnBlur
                onSubmit={(values, { resetForm }) => {createPost(values, resetForm)}}
                validationSchema={validationSchema}
                validateOnChange
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                    <div className={classes.postForm}>
                        <TextField
                            sx={{
                                marginBottom: "1rem",
                                width: "85%"
                            }}
                            label="Name of friend"
                            type={`text`}
                            name={`friendName`}
                            onBlur={handleBlur}
                            value={values.friendName}
                            onChange={handleChange}
                            multiline
                        />
                        <Button
                            sx={{
                                fontSize: "1.3rem",
                                textTransform: "none"
                            }}
                            variant="outlined"
                            disabled={!isValid || !dirty}
                            onClick={handleSubmit}
                            type={`submit`}
                        ><PeopleIcon
                            sx={{
                                marginRight: "0.3rem"
                            }}
                        />Find friends
                        </Button>
                    </div>
                )}
            </Formik>
        </React.Fragment>
    );
};

export default FindFriends;
