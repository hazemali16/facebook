import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
// import { useEffect, useState } from "react";
import FaceHome from "./FaceHome";
import { BrowserRouter } from "react-router-dom";
import Profile from "./Profile";
import Friends from "./Friends";
import Watch from "./Watch";

function Home() {
    return (
        <div className="home">
            <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<FaceHome />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/friends" element={<Friends />}></Route>
                <Route path="/watch" element={<Watch />}></Route>
            </Routes>
            </BrowserRouter>
        </div>
    );
}
export default Home;
