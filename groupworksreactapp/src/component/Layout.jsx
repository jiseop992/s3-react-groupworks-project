import React, { useEffect } from 'react';
import styled from 'styled-components';
import Main from './Main';
import Sidebar from './sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const StyledLayoutDiv = styled.div`
    width: 100vw;
    height: 100%;
    background-color: white;
    display: grid;
    grid-template-columns: 1fr 8fr;
    grid-template-rows: 1fr;
    place-items: center center;
    grid-gap: 2vw;
    a{
        color:inherit;
        text-decoration: none;
        &:hover{
            color: gray;
        }
    }
`;

const Layout = () => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const navigate = useNavigate();
    useEffect(() => {
        if (loginMemberNo === null) {
            navigate("/login");
        }
    }, [loginMemberNo, navigate]);

    return (
        loginMemberNo !== null && 
        <StyledLayoutDiv>
            <Sidebar />
            <Main />
        </StyledLayoutDiv>
    );
};

export default Layout;  