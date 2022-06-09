import React, {useState} from 'react';
import classes from './post-area.module.scss';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from "@mui/material/Button";
import PostService from "../../services/post-service";
import CommentIcon from '@mui/icons-material/Comment';
import CreateComments from "../create-comments/create-comments";

// import IconButton from '@mui/material/IconButton';
// import AddCommentIcon from '@mui/icons-material/AddComment';

const PostArea = (props) => {

    const [post, setPost] = useState(props.postText);

    let [showComments, setShowComments] = useState(false);

    let [commentsArray, setCommentsArray] = useState([{sd: 25}]);

    let emptyArr = false;

    if (commentsArray.length) {
        emptyArr = false;
    }

    if (!commentsArray.length) {
        emptyArr = true;
    }

    const postChangeText = (value) => {
        setPost(value);
    };

    const postChangeHandler = (value) => {
        props.onChangePostHandler(value, props.postId);
    };

    const deletePostHandler = () => {
        if(window.confirm("Are you sure you want to delete the post?")) {
            PostService.deletePost(props.postId).then((response) => {
                console.log(response);
                props.onDeletePost(response.data._id);
            })
        }
    };

    const showCommentsHandler = () => {
        setShowComments(!showComments);
    };

    return (
        <div className={classes.postAreaBlock}>
            <textarea
                id="post-text-area"
                name="textarea"
                rows="3"
                value={post}
                className={classes.postArea}
                onBlur={(event) => postChangeHandler(event.target.value)}
                onChange={(event) => postChangeText(event.target.value)}
            />
            <div className={classes.postInfo}>
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
                    variant="outlined"
                    onClick={showCommentsHandler}
                >
                    <CommentIcon
                        sx={{
                            marginRight: "0.3rem"
                        }}
                    />
                    Comments
                </Button>
                <Button
                sx={{
                    width: "22%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1rem",
                    textTransform: "none"
                }}
                variant="contained"
                onClick={deletePostHandler}
                type={`submit`}
                ><DeleteOutlineIcon
                sx={{
                    marginRight: "0.3rem"
                }}
                />Delete post
                </Button>
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
