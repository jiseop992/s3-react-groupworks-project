import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BookWrite from './BookWrite';
import BookEdit from './BookEdit';
import BookDelete from './BookDelete';
import BookList from './BookList';

const BookMain = () => {
    return (
        <Routes>
            <Route path='insert' element={<BookWrite />}/>
            <Route path='edit' element={<BookEdit />}/>
            <Route path='delete' element={<BookDelete />}/>
            <Route path='list' element={<BookList />}/>
        </Routes>
    );
};

export default BookMain;