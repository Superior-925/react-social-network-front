import React from 'react';
import TextField from '@mui/material/TextField';
import classes from './create-posts.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from "@mui/material/Button";
import PostService from "../../services/post-service";

const CreatePosts = (props) => {

    const validationSchema = yup.object().shape({
        post: yup.string().required('Required'),
    });

    function createPost(values, resetForm) {
        PostService.createPost(localStorage.getItem('userId'), values).then((response) => {
            props.onCreatePost(response.data.postText, response.data._id);
            resetForm();
        })
    }

    return (
        <div className={classes.createPostWrapper}>
            <Formik
                initialValues={{
                    post: ''
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
                                width: "100%"
                            }}
                            label="Post"
                            type={`text`}
                            name={`post`}
                            onBlur={handleBlur}
                            value={values.post}
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
                        ><EditIcon
                            sx={{
                                marginRight: "0.3rem"
                            }}
                        />Create post
                        </Button>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default CreatePosts;
