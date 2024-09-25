import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EditMember from '../member/EditMember';

const UserInfoDiv = styled.div`
    display: grid;
    grid-template-rows: 3fr 1fr; // 첫 번째 열을 3:1 비율로 2개의 행으로 구성
    gap: 10px; // 내부 그리드 간격

`;
const StyledInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 2px solid black;
    border-radius: 30px;
    align-items: center;
    & > div {
        text-align: center;
    }
`;

const StyledAnnualDiv = styled.div`
    border: 2px solid black;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;
    justify-content: center;
`;

const UserInfoMain = () => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const navigate = useNavigate();
    const [loginMemberVo, setLoginMemberVo] = useState([]);
    const [totalDays, setTotalDays] = useState();
    const [openModal, setOpenModal] = useState(false);

    
    useEffect( () => {
        fetch(`http://127.0.0.1:8888/app/api/member/${loginMemberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            setLoginMemberVo(data.loginMemberVo);
        });
        
        fetch(`http://127.0.0.1:8888/app/api/attendance/vacation/total/${loginMemberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            setTotalDays(data.totalDays);
        })
    },[]);

    const handleMemberEdit = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <UserInfoDiv>
            <StyledInfoDiv>
                <div><h2>[회원 정보]</h2></div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>이름 : {loginMemberVo.name}</Form.Label>
                        <br />
                        <Form.Label>회사명(현재 회사번호) : {loginMemberVo.companyName}</Form.Label>
                        <br />
                            <Form.Label>부서명 : { loginMemberVo.departName }</Form.Label>
                        <br /> 
                            <Form.Label>직책명 : { loginMemberVo.positionName }</Form.Label>
                        <br />
                </Form.Group>
                {
                    loginMemberVo.authNo === '1' &&
                        <>
                            <div>
                                <Button onClick={ () => {navigate(`/member/add`,{ state: { cNo : loginMemberVo.companyNo }})} }>구성원 추가</Button>
                                <Button variant='danger' onClick={ () => {navigate("/member/delete")} }>구성원 수정</Button>
                            </div>
                        </>
                }
                <br/>
                    <Button size='lg' onClick={handleMemberEdit}>개인정보 수정</Button>
                    <EditMember memberNo={loginMemberNo} openModal={openModal} handleCloseModal={handleCloseModal} />
            </StyledInfoDiv>
            <StyledAnnualDiv>
                <div>
                    사용 연차일 : {totalDays} 일
                </div>
                <div>
                    남은 연차일 : {loginMemberVo.annual} 일
                </div>
            </StyledAnnualDiv>
        </UserInfoDiv>

    );
};

export default UserInfoMain;