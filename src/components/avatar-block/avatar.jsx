import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";

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
import Background from "../../assets/avatar.png";
import CircularProgress from '@mui/material/CircularProgress';

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

const MyAvatar = () => {

    const [preview, setPreview] = useState(null);

    const [open, setOpen] = React.useState(false);

    const {fetchAvatar, changeAvatar} = useActions()

    const {avatar, loading, error} = useSelector(state => state.avatar)

    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const {pagePath} = useSelector(state => state.page);

    const {pageOwner} = useSelector(state => state.owner);

    const [style, setStyle] = useState({
        margin: "0.3rem auto",
        width: "95%",
        height: "300px",
        borderRadius: "150px",
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover"
    });

    useEffect(() => {
        console.log(pagePath);
        // if (avatar !== null && localStorage.getItem('userId') == pagePath) {
        //     setStyle( {
        //         margin: "0.3rem auto",
        //         width: "95%",
        //         height: "300px",
        //         borderRadius: "150px",
        //         backgroundImage: `url(data:image/png;base64,${avatar})`,
        //         backgroundSize: "cover"
        //     });
        // }
        // if (avatar !== null && localStorage.getItem('userId') != pagePath) {
        //     fetchAvatar(pagePath).then((response) => {
        //         if (response.data !== "") {
        //             setStyle( {
        //                 margin: "0.3rem auto",
        //                 width: "95%",
        //                 height: "300px",
        //                 borderRadius: "150px",
        //                 backgroundImage: `url(data:image/png;base64,${response.data})`,
        //                 backgroundSize: "cover"
        //             });
        //         }
        //         if (response.data === "") {
        //             setStyle( {
        //                 margin: "0.3rem auto",
        //                 width: "95%",
        //                 height: "300px",
        //                 borderRadius: "150px",
        //                 backgroundImage: `url(${Background})`,
        //                 backgroundSize: "cover"
        //             });
        //         }
        //     })
        // }
        // if (avatar === null) {
        if (pagePath === '') {
            fetchAvatar(localStorage.getItem('userId')).then((response) => {
                console.log(response);
                if (response.data !== "") {
                    setStyle( {
                        margin: "0.3rem auto",
                        width: "95%",
                        height: "300px",
                        borderRadius: "150px",
                        backgroundImage: `url(data:image/png;base64,${response.data})`,
                        backgroundSize: "cover"
                    });
                }
                if (response.data === "") {
                    setStyle( {
                        margin: "0.3rem auto",
                        width: "95%",
                        height: "300px",
                        borderRadius: "150px",
                        backgroundImage: `url(${Background})`,
                        backgroundSize: "cover"
                    });
                }
            })
        }
        else {
            fetchAvatar(pagePath).then((response) => {
                console.log(response);
                if (response.data !== "") {
                    setStyle( {
                        margin: "0.3rem auto",
                        width: "95%",
                        height: "300px",
                        borderRadius: "150px",
                        backgroundImage: `url(data:image/png;base64,${response.data})`,
                        backgroundSize: "cover"
                    });
                }
                if (response.data === "") {
                    setStyle( {
                        margin: "0.3rem auto",
                        width: "95%",
                        height: "300px",
                        borderRadius: "150px",
                        backgroundImage: `url(${Background})`,
                        backgroundSize: "cover"
                    });
                }
            })
        }



        // }
    }, [pagePath]);

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
        changeAvatar(localStorage.getItem('userId'), newAvatar).then((response) => {
            setStyle( {
                margin: "0.3rem auto",
                width: "95%",
                height: "300px",
                borderRadius: "150px",
                backgroundImage: `url(data:image/png;base64,${response.data})`,
                backgroundSize: "cover"
            });
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setPreview(null);
    };

    return (
        <React.Fragment>
            {error && <div className={classes.errorBlock}>{error}</div>}
            {loading && <div className={classes.loadingSpinner}><CircularProgress /></div>}
            {!loading && <div style={style}>
                {pageOwner &&  <button className={classes.editAvatarBtn} onClick={handleClickOpen}><AddIcon /></button>}
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
                                src={null}
                            />
                            <div className={classes.avatarPreview}>
                                {preview && <div className={classes.avatarPreviewTitle}>Preview of avatar</div>}
                                {preview && <img src={preview} alt="Preview" />}
                            </div>
                        </div>
                        {preview && <div className={classes.setAvatarButton}>
                        <Button variant="outlined" onClick={handleAvatarSubmit}
                        >Set avatar</Button></div>}
                    </DialogContent>
                </BootstrapDialog>
            </div>
            }
        </React.Fragment>
    );
};

export default MyAvatar;
