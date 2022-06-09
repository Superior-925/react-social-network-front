import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import classes from './create-posts.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from "@mui/material/Button";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import PostService from "../../services/post-service";

const CreatePosts = (props) => {

    const [text, setText] = useState('');

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    const [disableButton, setDisableButton] = useState(true);

    const handleChange = (value) => {
        setText(value);
        if (value === '<p><br></p>') {
            setDisableButton(true);
        }
        if (value !== '<p><br></p>') {
            setDisableButton(false);
        }
    };

    // const isDisabled = () => {
    //     if (text.trim().length < 1) {
    //         // setDisableButton(false);
    //         return true;
    //     }
    //     if (text.trim().length > 0) {
    //         // setDisableButton(true);
    //         return false;
    //     }
    // };

    const validationSchema = yup.object().shape({
        post: yup.string().required('Required'),
    });

    function createPost(values, resetForm) {
        PostService.createPost(localStorage.getItem('userId'), values).then((response) => {
            console.log(response);
            props.onCreatePost(response.data.postText,response.data.userId.nickname, response.data._id, response.data.updatedAt);
            resetForm();
        })
    }

    // function createPost() {
    //
    //     PostService.createPost(localStorage.getItem('userId'), text).then((response) => {
    //         props.onCreatePost(response.data.postText, response.data._id, response.data.updatedAt);
    //         setText('');
    //     })
    // }

    return (
        <div className={classes.createPostWrapper}>
            {/*<ReactQuill*/}
            {/*    theme="snow"*/}
            {/*    value={text}*/}
            {/*    onChange={handleChange}*/}
            {/*    modules={modules}*/}
            {/*    formats={formats}*/}
            {/*/>*/}
            {/*<div className={classes.submitButton}>*/}
            {/*    <Button*/}
            {/*        sx={{*/}
            {/*            fontSize: "1.3rem",*/}
            {/*            textTransform: "none"*/}
            {/*        }}*/}
            {/*        variant="outlined"*/}
            {/*        disabled={disableButton}*/}
            {/*        onClick={createPost}*/}
            {/*        type={`submit`}*/}
            {/*    ><EditIcon*/}
            {/*        sx={{*/}
            {/*            marginRight: "0.3rem"*/}
            {/*        }}*/}
            {/*    />Create post*/}
            {/*    </Button>*/}
            {/*</div>*/}


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
