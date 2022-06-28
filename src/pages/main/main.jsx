import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import classes from './main.module.scss'
import Container from '@mui/material/Container';
import HeaderBar from "../../components/header-bar/header-bar"
import LeftSideBar from "../../components/left-bar/left-side-bar";
import CreatePosts from "../../components/create-posts/create-posts";
import PostArea from "../../components/posts-area/post-area";
import CircularProgress from "@mui/material/CircularProgress";

export default function Main() {

    const { pathname } = window.location;
    const paths = pathname.split("/").filter(entry => entry !== "");
    const userIdFromPath = paths[paths.length - 1];

    let {fetchPosts} = useActions();

    let {posts, fetchPostsStatus, fetchPostsError, createPostStatus, createPostError, changePostAuthorStatus} = useSelector(state => state.posts);

    useEffect(() => {
        if (!posts.length) {
            fetchPosts(userIdFromPath);
        }
    }, [])

        return (
            <div>
                <Container
                    maxWidth="lg"
                >
                    <HeaderBar/>
                    <div className={classes.contentWrapper}>
                        <LeftSideBar/>
                        <div className={classes.mainContent}>
                            <CreatePosts/>
                            {fetchPostsStatus && <div className={classes.loadingSpinner}><CircularProgress /></div>}
                            {changePostAuthorStatus && <div className={classes.loadingSpinner}><CircularProgress /></div>}
                            {fetchPostsError && <div className={classes.errorBlock}>{fetchPostsError}</div>}
                            {createPostError && <div className={classes.errorBlock}>{createPostError}</div>}
                            {!fetchPostsStatus && !changePostAuthorStatus && posts.map((item, index)=> {
                                    return (
                                        <PostArea
                                            key={item.postId}
                                            postText={item.postText}
                                            postId={item.postId}
                                            updatedAt={item.updatedAt}
                                            user={item.postAuthor}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>

                </Container>
            </div>
        );
}
