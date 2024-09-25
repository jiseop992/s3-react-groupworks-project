import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import NoticeMain from './notice/NoticeMain';
import OrganMain from './organ/OrganMain';
import DocumentMain from './document/DocumentMain';
import BookMain from './book/BookMain';
import AddMember from './member/AddMember';
import DeleteMember from './member/DeleteMember';
import EditMember from './member/EditMember';


const StyledMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 6fr 4fr; 
    grid-template-rows: 1fr 1fr;
    place-items: center center;
    grid-gap: 1%;
`;

const Main = () => {
    return (
        <StyledMainDiv>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/notice/*' element={<NoticeMain />}></Route>
                <Route path='/document/*' element={<DocumentMain />}></Route>
                <Route path='/organ/*' element={<OrganMain />}></Route>
                <Route path='/book/*' element={<BookMain />}></Route>
                <Route path='/member/add/*' element={<AddMember />}></Route>
                <Route path='/member/delete/*' element={<DeleteMember />}></Route>
                <Route path='/member/edit/*' element={<EditMember />}></Route>
            </Routes>
        </StyledMainDiv>
    );
};

export default Main;