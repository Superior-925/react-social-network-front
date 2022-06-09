import React, {useContext, useState, useEffect, Component} from 'react';
import classes from './main.module.scss'
import Container from '@mui/material/Container';
import FacebookLogo from "../../assets/facebook-logo.png";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AuthService from "../../services/auth-service";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

import HeaderBar from "../../components/header-bar/header-bar"
import LeftSideBar from "../../components/left-bar/left-side-bar";
import CreatePosts from "../../components/create-posts/create-posts";
import PostArea from "../../components/posts-area/post-area";
import PostService from "../../services/post-service";
import {connect} from "react-redux";
import {fetchPosts} from "../../redux/actions/post";

class Main extends Component {

    state = {
        posts: []
    };

    componentDidMount() {
        this.props.fetchPosts();
        PostService.getPosts(localStorage.getItem('userId')).then((response) => {
            const newPostsArr = [];
            response.data.forEach((item) => {
                let date = new Date(item.updatedAt);
                let newDate = date.toLocaleString();
                newPostsArr.push({postText: item.postText, postAuthor: item.userId.nickname, postId: item._id, updatedAt: newDate})
            });
            this.setState({posts: [...newPostsArr]});
        });
    }

    addPostHandler = (postText, postAuthor, postId, updatedAt) => {
        let date = new Date(updatedAt);
        let newDate = date.toLocaleString();
        const userPost = {postText: postText, postAuthor: postAuthor, postId: postId, updatedAt: newDate};
        const newPostsArr = [...this.state.posts];
        newPostsArr.unshift(userPost);
        this.setState({posts: [...newPostsArr]});
        // setPosts(previousState => ([...previousState, userPost]
        // ));
        // console.log(this.state.posts);
    };

    deletePostHandler = (postId) => {
        const newPostsArr = [...this.state.posts];
        const foundPost = newPostsArr.findIndex((item) => item.postId == postId);
        newPostsArr.splice(foundPost, 1);
        this.setState({posts: [...newPostsArr]});
    };

    postChangeHandler = (postText, postId) => {
        // console.log(postText);
        // console.log(postId);
        PostService.changePost(postText, postId).then((response) => {
            // console.log(response);
            // let date = new Date(response.data.updatedAt);
            // let newDate = date.toLocaleString();
            const objIndex = this.state.posts.findIndex((obj => obj.postId === response.data._id));
            const newPostsArr = [...this.state.posts];
            newPostsArr[objIndex].postText = postText;
            // newPostsArr[objIndex].updatedAt = newDate;
            this.setState({posts: [...newPostsArr]});
        })
    };

    changePostAuthor = (postAuthor) => {
        const newPostsArr = [...this.state.posts];
        newPostsArr.forEach((item) => {
            item.postAuthor = postAuthor;
        });
        this.setState({posts: [...newPostsArr]});
    };

    render() {
        return (
            <div>
                <Container
                    maxWidth="lg"
                >
                    <HeaderBar
                    changeNickname={this.changePostAuthor}
                    />
                    <div className={classes.contentWrapper}>
                        <LeftSideBar/>
                        <div className={classes.mainContent}>
                            <CreatePosts
                                onCreatePost={this.addPostHandler}
                                postText
                            />
                            {
                                this.state.posts.map((item, index)=> {
                                    return (
                                        <PostArea
                                            key={item.postId}
                                            postText={item.postText}
                                            postId={item.postId}
                                            updatedAt={item.updatedAt}
                                            user={item.postAuthor}
                                            onDeletePost={this.deletePostHandler}
                                            onChangePostHandler={this.postChangeHandler}
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
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPosts: () => dispatch(fetchPosts())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);
