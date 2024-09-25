import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledSelectType = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const AttendanceTypeSelect = () => {
    return (
        <StyledSelectType>
            <div>
                <Button variant='primary'>출장/외근</Button>
            </div>
            <div>
                <Button variant='primary'>휴가</Button>
            </div>
        </StyledSelectType>
    );
};

export default AttendanceTypeSelect;