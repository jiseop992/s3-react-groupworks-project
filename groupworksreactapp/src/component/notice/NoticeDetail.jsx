import React from 'react';
import styled from 'styled-components';


const StyledNoticeDetailDiv = styled.div`
    width: 100%;
    height: 100%;
`;

const NoticeDetail = () => {
    return (
        <StyledNoticeDetailDiv>
            <h1>공지사항 상세 조회</h1>
        </StyledNoticeDetailDiv>
    );
};

export default NoticeDetail;