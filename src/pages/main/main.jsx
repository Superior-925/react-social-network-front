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

// function Main() {
//
//     const defaultPosts = [];
//
//     const [create-posts, setPosts] = useState(defaultPosts);
//
//     let newPostsArr = [];
//
//     useEffect(() => {
//         PostService.getPosts(localStorage.getItem('userId')).then((response) => {
//             response.data.forEach((item) => {
//                 newPostsArr.push({postText: item.postText, postId: item._id})
//             });
//             setPosts([...newPostsArr]);
//             console.log(create-posts);
//             // setPosts(previousState => ([...previousState, ...newPostsArr]
//             // ));
//         });
//     }, []);
//
//
//     const addPostHandler = (postText, postId) => {
//         const userPost = {postText: postText, postId: postId};
//         newPostsArr = [...create-posts];
//         newPostsArr.push(userPost);
//         console.log(newPostsArr);
//         setPosts([...newPostsArr]);
//         // setPosts(previousState => ([...previousState, userPost]
//         // ));
//         console.log(create-posts);
//     };
//
//     const deletePostHandler = (postId) => {
//         console.log(postId);
//         console.log(newPostsArr);
//         newPostsArr = [...create-posts];
//         const foundPost = newPostsArr.findIndex((item) => item.postId == postId);
//         console.log(foundPost);
//         newPostsArr.splice(foundPost, 1);
//         // const filteredArr = newPostsArr.filter((item) => {return +item.postId !== postId});
//         console.log(newPostsArr);
//         setPosts([...newPostsArr]);
//         // setPosts(create-posts.filter(item => item.postId != postId));
//         console.log(create-posts);
//     };
//
//     return (
//         <div>
//                 <Container
//                     maxWidth="lg"
//                     sx={{
//                     display: "flex",
//                     flexDirection: "column"
//                 }}
//                 >
//                     <HeaderBar/>
//                     <div className={classes.contentWrapper}>
//                         <LeftSideBar/>
//                         <div className={classes.mainContent}>
//                             <CreatePosts
//                                 onCreatePost={addPostHandler}
//                                 postText
//                             />
//                             {
//                                 create-posts.map((item, index)=> {
//                                     return (
//                                         <PostArea
//                                            key={index}
//                                            postText={item.postText}
//                                            postId={item.postId}
//                                            onDeletePost={deletePostHandler}
//                                         />
//                                     )
//                                 })
//                             }
//                         </div>
//                     </div>
//
//                 </Container>
//         </div>
//     );
// };
//
// export default Main;

class Main extends Component {

    state = {
        posts: []
    };

    componentDidMount() {
        PostService.getPosts(localStorage.getItem('userId')).then((response) => {
            console.log(response);
            const newPostsArr = [];
            response.data.forEach((item) => {
                let date = new Date(item.updatedAt);
                let newDate = date.toLocaleString();
                newPostsArr.push({postText: item.postText, postId: item._id, updatedAt: newDate})
            });
            this.setState({posts: [...newPostsArr]});
            console.log(this.state.posts);
            // setPosts(previousState => ([...previousState, ...newPostsArr]
            // ));
        });
    }

    addPostHandler = (postText, postId, updatedAt) => {
        let date = new Date(updatedAt);
        let newDate = date.toLocaleString();
        const userPost = {postText: postText, postId: postId, updatedAt: newDate};
        const newPostsArr = [...this.state.posts];
        newPostsArr.push(userPost);
        console.log(this.newPostsArr);
        this.setState({posts: [...newPostsArr]});
        // setPosts(previousState => ([...previousState, userPost]
        // ));
        console.log(this.state.posts);
    };

    deletePostHandler = (postId) => {
        console.log(postId);
        const newPostsArr = [...this.state.posts];
        const foundPost = newPostsArr.findIndex((item) => item.postId == postId);
        console.log(foundPost);
        newPostsArr.splice(foundPost, 1);
        // const filteredArr = newPostsArr.filter((item) => {return +item.postId !== postId});
        console.log(newPostsArr);
        this.setState({posts: [...newPostsArr]});
        // setPosts(create-posts.filter(item => item.postId != postId));
        console.log(this.state.posts);
    };

    postChangeHandler = (postText, postId) => {
        console.log(postText);
        console.log(postId);
        PostService.changePost(postText, postId).then((response) => {
            console.log(response);
            let date = new Date(response.data.updatedAt);
            let newDate = date.toLocaleString();
            const objIndex = this.state.posts.findIndex((obj => obj.postId === response.data._id));
            const newPostsArr = [...this.state.posts];
            newPostsArr[objIndex].postText = postText;
            newPostsArr[objIndex].updatedAt = newDate;
            this.setState({posts: [...newPostsArr]});
        })
    };

    render() {
        return (
            <div>
                <Container
                    maxWidth="lg"
                >
                    <HeaderBar/>
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
                                            user={localStorage.getItem("userNickname")}
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


export default Main;
