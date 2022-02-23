import React, {useState, useEffect} from 'react';
import classes from "./avatar.module.scss";
import AddIcon from '@mui/icons-material/Add';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from 'react-avatar-edit';
import Button from "@mui/material/Button";
import AvatarService from "../../services/avatar-service";
import Background from "../../assets/avatar.png";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

let newAvatar;

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const MyAvatar = (props) => {

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        AvatarService.getAvatar(localStorage.getItem('userId')).then((response) => {
            setStyle( {
                margin: "0.3rem auto",
                width: "95%",
                height: "300px",
                // border: "solid 1px lightslategray",
                borderRadius: "150px",
                backgroundImage: `url(data:image/png;base64,${response.data})`,
                backgroundSize: "cover"
            });
        })
    }, []);

    const [style, setStyle] = useState({
        margin: "0.3rem auto",
        width: "95%",
        height: "300px",
        // border: "solid 1px lightslategray",
        borderRadius: "150px",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover"
    });

    function onClose() {
        setPreview(null);
    }
    function onCrop(pv) {
        setPreview(pv);
        newAvatar = pv;
    }
    function onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 3145728) {
            alert("File is too big!");
            elem.target.value = "";
        }
    }

    function handleAvatarSubmit () {
        AvatarService.changeAvatar(localStorage.getItem('userId'), newAvatar).then((response) => {
            console.log(response);
            setStyle( {
                margin: "0.3rem auto",
                width: "95%",
                height: "300px",
                // border: "solid 1px lightslategray",
                borderRadius: "150px",
                backgroundImage: `url(data:image/png;base64,${response.data})`,
                backgroundSize: "cover"
            });
        });
        // const elem = document.getElementsByClassName('slider__runner')[0]
        // console.log(onImageLoad());
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setPreview(null);
    };

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    return (
        <div style={style}>
            <button className={classes.editAvatarBtn} onClick={handleClickOpen}><AddIcon /></button>

            <BootstrapDialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <div>Avatar editor</div>
                </BootstrapDialogTitle>
                <DialogContent
                    dividers>
                    <div className={classes.setAvatar}>
                    <Avatar
                        imageWidth={250}
                        width={250}
                        onCrop={onCrop}
                        onClose={onClose}
                        onBeforeFileLoad={onBeforeFileLoad}
                        // onImageLoad={onImageLoad}
                        // onFileLoad={onFileLoad}
                        src={null}
                    />
                        <div className={classes.avatarPreview}>
                        {preview && <div className={classes.avatarPreviewTitle}>Preview of avatar</div>}
                        {preview && <img src={preview} alt="Preview" />}
                        </div>
                    </div>
                    {preview && <div className={classes.setAvatarButton}><Button variant="outlined"
                        onClick={handleAvatarSubmit}
                    >Set avatar</Button></div>}
                </DialogContent>
            </BootstrapDialog>

        </div>



    );
};

export default MyAvatar;
