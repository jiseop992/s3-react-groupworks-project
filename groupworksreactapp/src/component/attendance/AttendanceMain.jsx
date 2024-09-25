import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import AttendanceAdd from './AttendanceAdd';
import UserInfoMain from './UserInfoMain';

const StyeldAttendDiv = styled.div`
    width: 90%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr; // 두 개의 열로 구성
    gap: 10px; // 그리드 간격
`;

const StyledAttendInputDiv = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 6fr;
    border: 2px solid black;
    border-radius: 5%;
    & > div {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const StyledSelectType = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const AttendanceMain = ( ) => {
    const [workEvent , setWorkEvent] = useState('');

    
    return (
        <StyeldAttendDiv>
            <UserInfoMain />
            <StyledAttendInputDiv>
                <div>
                    <h3>일정등록</h3>
                </div>
                <StyledSelectType>
                    <div>
                        <Button variant='primary' onClick={() => setWorkEvent('outwork')}>출장/외근</Button>
                    </div>
                    <div>
                        <Button variant='primary'onClick={() => setWorkEvent('vacation')}>휴가</Button>
                    </div>
                </StyledSelectType>
                <div>

                {
                    workEvent === 'outwork' && <AttendanceAdd type={"outwork"} />
                }
                {
                    workEvent === 'vacation' && <AttendanceAdd type={"vacation"} />
                }                
                </div>
            </StyledAttendInputDiv>
        </StyeldAttendDiv>
    );
};

export default AttendanceMain;