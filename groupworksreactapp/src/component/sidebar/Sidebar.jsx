import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const StyledSideDiv = styled.div`
    position: sticky;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border-radius: 10px;
    width: 13vw;
    height: 100vh;
    background-color: #282c34;
    & > div,StyledLogoutDiv {
        display: flex;
        flex-direction: column;
        font-size: 2rem;
        color: white;
    }
    
`;

const Sidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("loginMemberNo");
        navigate("/login");
    };

    return (
        <StyledSideDiv>
                    <div><Link to="/">Home</Link></div>
                    <div><Link to="/notice/list">공지사항</Link></div>
                    <div><Link to="/document/list">전자결재</Link></div>
                    <div><Link to="/organ/list">조직도</Link></div>
                    <div><Link to="/book/list">예약</Link></div>
                    <div><Button variant='primary' size='lg' onClick={handleLogout}>Log Out</Button></div>
        </StyledSideDiv>
    );
};

export default Sidebar;