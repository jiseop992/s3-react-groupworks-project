import React from 'react';
import OrganWrite from './OrganWrite';
import OrganList from './OrganList';
import OrganEdit from './OrganEdit';
import OrganDelete from './OrganDelete';
import { Route, Routes } from 'react-router-dom';

const OrganMain = () => {
    return (
        <Routes>
            <Route path='insert' element={<OrganWrite/>}/>
            <Route path='list' element={<OrganList/>}/>
            <Route path='edit' element={<OrganEdit/>}/>
            <Route path='delete' element={<OrganDelete/>}/>
        </Routes>
    );
};

export default OrganMain;