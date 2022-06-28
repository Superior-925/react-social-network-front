import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import classes from './create-posts.module.scss';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';

const CreatePosts = () => {

    const {addPost} = useActions()

    const {createPostStatus} = useSelector(state => state.posts);

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

    function createPost() {
        addPost(localStorage.getItem('userId'), text).then((response) => {
            setText('');
        })
    }

    return (
        <div className={classes.createPostWrapper}>
            <ReactQuill
                theme="snow"
                placeholder={'Your post...'}
                modules={modules}
                formats={formats}
                onChange={handleChange}
                value={text}
            />
            <div className={classes.submitButton}>
                <LoadingButton
                        sx={{
                            fontSize: "1.3rem",
                            textTransform: "none"
                        }}
                    onClick={createPost}
                    endIcon={<SendIcon />}
                    disabled={disableButton}
                    loading={createPostStatus}
                    loadingPosition="end"
                    variant="contained"
                    type={`submit`}
                > Create post
                </LoadingButton>
            </div>
        </div>
    );
};

export default CreatePosts;
