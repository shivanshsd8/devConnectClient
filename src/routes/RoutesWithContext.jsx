import { Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Layout from "../layouts/Layout";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Home from "../pages/Home/Home";
import Notfound from "../pages/Notfound";
import Feed from '../pages/Home/Feed'
import Bookmarks from '../pages/Home/Bookmarks'


import { DevconnectContext } from "../context/DevconnectContext";
import { useContext } from "react";

import PrivateRoute from "../components/PrivateRoute";
import Profile from "../pages/Profile/Profile";
import EditProfile from '../pages/Profile/EditProfile';

export default function RoutesWithContext() {
    const { isAuthenticated } = useContext(DevconnectContext)
    return (
        <Routes>
            {/* Not an actual route just checking if authenticated then redirect to / else to /auth/signin */}
            <Route path="/"
                element={isAuthenticated() ?
                    (<Navigate to="/home" replace />) :
                    (<Navigate to="/auth/signin" replace />)}>
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
                <Route path="signup" element={<Register />} />
                <Route path="signin" element={<Login />} />
            </Route>
            <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
                <Route path="home" element={<Home />} />
                <Route path="explore" element={<Feed />} />
                <Route path="bookmarks" element={<Bookmarks />} />
                <Route path="profile" element={<Profile />} />
                <Route path="editProfile" element={<EditProfile />} />

                {/* <Route path="about" element={<About />} /> */}
            </Route>
            <Route path="*" element={<Notfound/>}></Route>
        </Routes>
    )
}