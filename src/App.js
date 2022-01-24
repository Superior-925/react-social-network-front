import './App.css';
import React from 'react';
import Router from "./router/router";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Home from "./pages/home/home";
import Main from "./pages/main/main";
import Friends from "./pages/friends/friends";

function App() {

  return (
    <div className="App">
        <Router/>
      {/*<BrowserRouter>*/}
      {/*  <Routes>*/}
      {/*      <Route path="/home" element={<Home />}/>*/}
      {/*      <Route path="/" element={<Navigate to ="/home" />}/>*/}
      {/*      <Route path={"/main/user/id" + "/:userId"} element={<Main />}/>*/}
      {/*      <Route path={"/friends/user/id" + "/:userId"} element={<Friends />}/>*/}
      {/*  </Routes>*/}
      {/*</BrowserRouter>*/}
    </div>
  );
}

export default App;
