import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    background: white;

`;

const Label = styled.label`
    margin-bottom: 10px;
    color: #333;
    font-size: 1rem;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 1rem;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;

const BookWrite = () => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const [loginMemberVo, setLoginMemberVo] = useState([]);

    const [bookData, setBookData] = useState({
        memberNo: loginMemberNo,
        bookPlace: '',
        startDate: '',
        endDate: '',
        bookPurpose: ''
    });

    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();
    
const handleDateChange = (e) => {
    // 'YYYY-MM-DDTHH:MM' 형식을 'YYYY-MM-DD HH:MM:SS' 형식으로 변환하지 않고 그대로 사용
    setBookData({ ...bookData, [e.target.name]: e.target.value });
};

    //로긔인멤버 정보 불러오기
    const func = ( ) => {
        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/member/${loginMemberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            setLoginMemberVo(data.loginMemberVo);
        });
    }
    useEffect( () => {
        func();
    },[]);

    //작성 fetch
    const handleSubmit = async (e) => {
        e.preventDefault();
        // useDate 값을 startDate로 설정
        // const updatedBookData = {
        //     ...bookData,
        //     useDate: startDate
        // useDate 값을 useDate 상태로 설정
        // const updatedBookData = {
        //     ...bookData,
        //     useDate
        // };
    
        try {
            // // JSON 데이터로 변환
            // const jsonData = {
            //     memberNo: bookData.memberNo,
            //     useDate: bookData.useDate,
            //     bookPurpose: bookData.bookPurpose
            // };
    
            // console.log('JSON 데이터 전송:', jsonData);
    
            // JSON 데이터로 요청 전송
            const response = await fetch('${process.env.REACT_APP_GROUPWORKS_API_URL}/app/book/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태: ${response.status}`);
            }
    
            const responseBody = await response.json();
            console.log('예약 신청 성공:', responseBody);
            alert('예약 신청 완료')
            navigate('/book/list');
        } catch (error) {
            console.error('예약 신청 실패:', error);
        }
    }
    

    return (
        <Form onSubmit={handleSubmit}>
            <Label>이름 : {loginMemberVo.name}</Label>
            <Label>
                예약장소
                <Input
                    type="text"
                    name="bookPlace"
                    value={bookData.bookPlace}
                    onChange={handleChange}
                />
            </Label>
            <Label>
                시작 일자
                <Input type="datetime-local" name="startDate" value={bookData.startDate} onChange={handleChange} />
            </Label>
            <Label>
                종료 일자
                <Input type="datetime-local" name="endDate" value={bookData.endDate} onChange={handleChange} />
            </Label>
            <Label>
                사용 목적
                <Input
                    type="text"
                    name="bookPurpose"
                    value={bookData.bookPurpose}
                    onChange={handleChange}
                />
            </Label>
                <SubmitButton type="submit">저장</SubmitButton>
        </Form>
    );
};

export default BookWrite;
