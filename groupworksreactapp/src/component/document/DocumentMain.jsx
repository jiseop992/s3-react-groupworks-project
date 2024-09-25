import React from 'react';
import { Routes, Route } from 'react-router';
import DocumentList from './DocumentList';
import DocumentWrite from './DocumentWrite';
import styled from 'styled-components';
import BusinessFormWrite from './BusinessFormWrite';

// const StyledDocumentDiv = styled.div`
//     width: 100%;
//     height: 100%;
// `;

const DocumentMain = () => {
    return (
            <Routes>
                <Route path='list' element={<DocumentList/>}/>
                <Route path='write' element={<DocumentWrite/>}/>
                <Route path='businessWrite' element={<BusinessFormWrite/>}/>
            </Routes>
    );
};

export default DocumentMain;