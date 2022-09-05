import * as React from 'react';
import {forwardRef, useRef, useImperativeHandle, useState} from 'react';

import PropTypes from 'prop-types';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import classes from './chat-dialog.module.scss';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import {blue} from '@mui/material/colors';
//import classes from "../create-posts/create-posts.module.scss";
import {LoadingButton} from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {

    const modules = {
        toolbar: [
            [{'header': [1, 2, false]}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'ordered'
    ];

    const [text, setText] = useState('');

    const [disableButton, setDisableButton] = useState(true);

    const [sendMessageStatus, setSendMessageStatus] = useState(false);

    const handleChange = (value) => {
        setText(value);
        if (value === '<p><br></p>') {
            setDisableButton(true);
        }
        if (value !== '<p><br></p>') {
            setDisableButton(false);
        }
    };

    const {onClose, selectedValue, open} = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const sendMessage = () => {

    }

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog
            fullWidth='true'
            maxWidth='md'
            onClose={handleClose}
            open={open}>
            <DialogTitle
                sx={{
                    height: '2rem',
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                Your dialog with {props.nickname}
                <IconButton aria-label="delete" size="large">
                    <HighlightOffIcon fontSize="large"/>
                </IconButton>
            </DialogTitle>

            <ReactQuill
                theme="snow"
                placeholder={'Your message...'}
                modules={modules}
                formats={formats}
                onChange={handleChange}
                value={text}
            />
            <LoadingButton
                sx={{
                    fontSize: "1rem",
                    width: "100%",
                    textTransform: "none"
                }}
                onClick={sendMessage}
                endIcon={<SendIcon/>}
                disabled={disableButton}
                loading={sendMessageStatus}
                loadingPosition="end"
                variant="contained"
                type={`submit`}
            > Send message
            </LoadingButton>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export const DialogChat = forwardRef((props, ref) => {

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);
    const [nickname, setNickname] = React.useState('');

    useImperativeHandle(ref, () => ({
        handleClickOpen(friendNickname) {
            console.log(friendNickname);
            setNickname(friendNickname);
            setOpen(true);
        }
    }));


    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <React.Fragment>
            {/*<Typography variant="subtitle1" component="div">*/}
            {/*    Selected: {selectedValue}*/}
            {/*</Typography>*/}
            {/*<br />*/}
            {/*<Button variant="outlined" onClick={handleClickOpen}>*/}
            {/*    Open simple dialog*/}
            {/*</Button>*/}
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                nickname={nickname}
            />
        </React.Fragment>
    );
})
