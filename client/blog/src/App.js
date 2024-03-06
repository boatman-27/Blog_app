import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Router } from "react-router-dom";
import axios from "axios";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Profile from "./pages/Profile";
import PrivateRoutes from "./utils/PrivateRoutes";
import MyBlogs from "./pages/MyBlogs";

function App() {
  const [user, setUser] = useState(null);
  const handleLogin = () => {
    setUser(true);
  };

  return (
    <React.Fragment>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/main" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/myblogs" element={<MyBlogs />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />s
      </Routes>
    </React.Fragment>
  );
}

export default App;
