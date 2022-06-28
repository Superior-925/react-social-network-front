import React, {useState} from 'react';
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import classes from './post-area.module.scss';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from "@mui/material/Button";
import CommentIcon from '@mui/icons-material/Comment';
import CreateComments from "../create-comments/create-comments";
import EditIcon from '@mui/icons-material/Edit';
import ReactQuill from 'react-quill'
import { LoadingButton } from '@mui/lab';
import CircularProgress from "@mui/material/CircularProgress";

const PostArea = (props) => {

    const [post, setPost] = useState(props.postText);

    const {changePostStatus} = useSelector(state => state.posts);

    const [changeStatus, setChangeStatus] = useState(false);

    const [deletePostStatus, setDeletePostStatus] = useState(false);

    const [disableButton, setDisableButton] = useState(true);

    const [changePostButtonStatus, setChangePostButtonStatus] = useState(false);

    const [modules, setModules] = useState(false);

    const [readOnlyStatus, setReadOnlyStatus] = useState(false);

    let [showComments, setShowComments] = useState(false);

    let [commentsArray, setCommentsArray] = useState([{sd: 25}]);

    let {deletePost, changePost} = useActions();

    let emptyArr = false;

    if (commentsArray.length) {
        emptyArr = false;
    }

    if (!commentsArray.length) {
        emptyArr = true;
    }

    const postChangeHandler = (value) => {
        setPost(value);
        if (value === '<p><br></p>') {
            setDisableButton(true);
        }
        if (value !== '<p><br></p>') {
            setDisableButton(false);
        }
    };

    const deletePostHandler = () => {
        if(window.confirm("Are you sure you want to delete the post?")) {
            setDeletePostStatus(true);
            deletePost(props.postId);
        }
    };

    const postSendChangesHandler = () => {
        setChangeStatus(true);
        changePost(post, props.postId).then((response) => {
            setChangeStatus(false);
        })
    }

    const showHideComments = () => {
        setShowComments(!showComments);
    };

    const showHideModules = () => {
        setModules(!modules);
        setReadOnlyStatus(!readOnlyStatus);
        setChangePostButtonStatus(!changePostButtonStatus);
        setDisableButton(false);
    };

    const showModules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline','strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    };

    const hideModules = {
        toolbar: false
    }

    return (
        <div className={classes.postAreaBlock}>
            <ReactQuill
                value={post}
                modules={modules ? showModules : hideModules}
                readOnly={!readOnlyStatus}
                theme={"snow"}
                className={classes.postArea}
                onChange={postChangeHandler}
            />
            <div className={classes.postInfoBlock}>
                <div className={classes.postAuthor}>{props.user}</div>
                <span className={classes.dot}>
                </span>
                <div className={classes.postDate}>{props.updatedAt}</div>
            </div>
            <div className={classes.buttonsBlock}>
                <Button
                    sx={{
                        width: "22%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "1rem",
                        textTransform: "none",
                        marginRight: "0.7rem"
                    }}
                    size="small"
                    variant="outlined"
                    onClick={showHideModules}
                ><EditIcon
                    sx={{
                        marginRight: "0.3rem"
                    }}
                />Edit post
                </Button>
                {changePostButtonStatus && <div>
                    <LoadingButton
                        sx={{
                            width: "100px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "1rem",
                            textTransform: "none",
                            marginRight: "0.7rem"
                        }}
                        size="small"
                        onClick={postSendChangesHandler}
                        loading={changeStatus}
                        loadingIndicator="Sending..."
                        variant="outlined"
                        disabled={disableButton}
                    >
                        Save
                    </LoadingButton>
                </div>}
                <Button
                    sx={{
                        width: "22%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "1rem",
                        textTransform: "none",
                        marginRight: "0.7rem"
                    }}
                    size="small"
                    variant="outlined"
                    onClick={showHideComments}
                >
                    <CommentIcon
                        sx={{
                            marginRight: "0.3rem"
                        }}
                    />
                    Comments
                </Button>
                <LoadingButton
                    sx={{
                        width: "22%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "1rem",
                        textTransform: "none"
                    }}
                    onClick={deletePostHandler}
                    startIcon={<DeleteOutlineIcon
                        fontSize="large"
                    />}
                    loading={deletePostStatus}
                    loadingPosition="start"
                    variant="contained"
                    size="small"
                > Delete post
                </LoadingButton>
            </div>
            {showComments &&
                <div className={classes.commentsBlock}>
                    {emptyArr && showComments && <div className={classes.noComments}>No comments yet! You will be the first.</div>}
                    {!emptyArr && showComments && <div className={classes.commentsBlockTitle}>Comments:</div>}
                    <CreateComments/>
                </div>}
        </div>
    );
};

export default PostArea;
