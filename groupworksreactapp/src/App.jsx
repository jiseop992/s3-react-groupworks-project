import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout';
import Login from './component/authentication/login/Login';
import SignUp from './component/authentication/signup/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // 로그인 상태 관리 로직 (예시)
  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setLoggedInUser(userInfo);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/sign-up' element={<SignUp />}></Route>
        <Route path='*' element={<Layout loggedInUser={loggedInUser} />}/> {/* 로그인한 사용자 정보를 Layout에 전달 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
