import React, {useState} from 'react';
import classes from './post-area.module.scss';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Button from "@mui/material/Button";
import PostService from "../../services/post-service";
import CommentIcon from '@mui/icons-material/Comment';
import AddCommentIcon from '@mui/icons-material/AddComment';

const PostArea = (props) => {

    let [showComments, setShowComments] = useState(false);

    let [commentsArray, setCommentsArray] = useState([]);

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

    // const tx = document.getElementsByTagName("textarea");
    // for (let i = 0; i < tx.length; i++) {
    //     tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    //     tx[i].addEventListener("input", OnInput, false);
    // }
    //
    // function OnInput() {
    //     this.style.height = "auto";
    //     this.style.height = (this.scrollHeight) + "px";
    // }

    return (
        <div className={classes.postAreaBlock}>
            <textarea
                rows="3"
                value={props.postText}
                className={classes.postArea}
                onChange={postChangeHandler}>
            </textarea>
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
                    <div className={classes.addCommentBlock}>
                        <textarea
                            rows="2"
                            className={classes.createCommentArea}>
                        </textarea>
                        <AddCommentIcon
                            className={classes.createCommentButton}
                        />
                    </div>

                </div>}



            {/*{showComments && !emptyArr && <div className={classes.commentsBlock}>*/}
            {/*    Comments:*/}
            {/*</div>}*/}
        </div>
    );
};

export default PostArea;
