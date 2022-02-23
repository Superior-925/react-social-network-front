import React, {useState} from 'react';
import classes from './create-comments.module.scss';
import IconButton from '@mui/material/IconButton';
import AddCommentIcon from '@mui/icons-material/AddComment';

const CreateComments = (props) => {


    return (
        <div className={classes.addCommentBlock}>
                        <textarea
                            rows="2"
                            className={classes.createCommentArea}>
                        </textarea>
            <IconButton
                sx={{
                    marginLeft: "0.7rem"
                }}
                disabled={false}
                color="primary"
                aria-label="add comment">
                <AddCommentIcon/>
            </IconButton>
        </div>
    )
};

export default CreateComments;
