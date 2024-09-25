import React from 'react';
import TodoList from './todo/TodoList';
import NoticeList from './notice/NoticeList';
import AttendanceMain from './attendance/AttendanceMain';
import TestCalendar from './calendar/TestCalendar';

const Home = () => {
    
    return (
        <>
            {/* <Calendar /> */}
            <TestCalendar />
            <AttendanceMain />
            <NoticeList  showTopFive={true} showWriteButton={false} showPagination={false} showEditAndDelete={false}/>
            <TodoList />
        </>
    );
};

export default Home;