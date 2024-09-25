import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NoticeDetail from './NoticeDetail';
import NoticeList from './NoticeList';
import NoticeEdit from './NoticeEdit';
import NoticeDelete from './NoticeDelete';
import NoticeWrite from './NoticeWrite';



const NoticeMain = () => {
    return (
        <Routes>
            <Route path='insert' element={<NoticeWrite/>}/>
            <Route path='list' element={<NoticeList showTopFive={false} showWriteButton={true} showPagination={true} showEditAndDelete={true} />} />
            <Route path='detail' element={<NoticeDetail/>}/>
            <Route path='edit' element={<NoticeEdit/>}/>
            <Route path='delete' element={<NoticeDelete/>}/>
        </Routes>
    );
};

export default NoticeMain;