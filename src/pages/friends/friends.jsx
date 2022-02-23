import React, {useContext, useState, useEffect} from 'react';
import classes from './friends.module.scss'
import Container from '@mui/material/Container';

import HeaderBar from "../../components/header-bar/header-bar"
import LeftSideBar from "../../components/left-bar/left-side-bar";
import FindFriends from "../../components/find-friends/find-friends";

function Friends() {

    // useEffect(() => {
    //     PostService.getPosts(localStorage.getItem('userId')).then((response) => {
    //         response.data.forEach((item) => {
    //             newPostsArr.push({postText: item.postText, postId: item._id})
    //         });
    //         setPosts([...newPostsArr]);
    //         console.log(create-posts);
    //         // setPosts(previousState => ([...previousState, ...newPostsArr]
    //         // ));
    //     });
    // }, []);

    return (
        <div>
            <Container
                maxWidth="lg"
                sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <HeaderBar/>
                <div className={classes.contentWrapper}>
                    <LeftSideBar/>
                    <div className={classes.mainContent}>
                        <FindFriends/>
                    </div>
                </div>

            </Container>
        </div>
    );
};

export default Friends;
