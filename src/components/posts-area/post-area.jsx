import React, {useState} from 'react';
import classes from './post-area.module.scss';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from "@mui/material/Button";
import PostService from "../../services/post-service";
import CommentIcon from '@mui/icons-material/Comment';

const PostArea = (props) => {

    let [showComments, setShowComments] = useState(false);

    let [commentsArray, setCommentsArray] = useState([{posr: 12}]);

    let emptyArr = false;

    if (commentsArray.length) {
        emptyArr = false;
    }

    if (!commentsArray.length) {
        emptyArr = true;
    }

    const postChangeHandler = () => {

    };

    const deletePostHandler = () => {
        console.log(props.postId);
        PostService.deletePost(props.postId).then((response) => {
            console.log(response);
            props.onDeletePost(response.data._id);
        })
    };

    const showCommentsHandler = () => {
        setShowComments(!showComments);
    };

    return (
        <div className={classes.postAreaBlock}>
            <textarea
                rows="3"
                value={props.postText}
                className={classes.postArea}
                onChange={postChangeHandler}>
            </textarea>
            {emptyArr && showComments && <div>No comments!</div>}
            {showComments && !emptyArr && <div className={classes.commentsBlock}>
                Comments:

                {/*{(commentsArray.length>0) && <div className={classes.commentsItems}>Comments block!</div>}*/}

            </div>}
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
        </div>
    );
};

export default PostArea;
