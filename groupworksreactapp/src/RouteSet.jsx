import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './component/authentication/login/Login';
import SignUp from './component/authentication/signup/SignUp';
import Home from './component/Home';
import NoticeMain from './component/notice/NoticeMain';
import OrganMain from './component/organ/OrganMain';
import Main from './component/Main';
import Layout from './component/Layout';
import Sidebar from './component/sidebar/Sidebar';

const RouteSet = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/sign-up' element={<SignUp />}></Route>
        </Routes>
    );
};

export default RouteSet;