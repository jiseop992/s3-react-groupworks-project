import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledBookEditDiv = styled.div`
    /* width: 100%;
    height: 100%;
    padding: 20px; */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 1000;
    border-radius: 10px; // 모달에 둥근 모서리 추가
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); // 그림자 효과 추가
    max-width: 500px; // 모달의 최대 너비 설정
`;

const BookEdit = () => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const [loginMemberVo, setLoginMemberVo] = useState([]);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [editedBook, setEditedBook] = useState(location.state?.selectedVo || {
        bookNo: '',
        memberNo: loginMemberNo,
        bookPlace: '',
        startDate: '',
        endDate: '',
        bookPurpose: '',
        updateDate: ''
    })

    useEffect(() => {
        if (location.state?.selectedVo) {
            const selectedBook = location.state.selectedVo;
            setEditedBook(selectedBook);
        
            // startDate와 endDate를 ISO 형식으로 변환하여 설정
            if (selectedBook.startDate) {
                setStartDate(selectedBook.startDate.replace(' ', 'T'));
            }
            if (selectedBook.endDate) {
                setEndDate(selectedBook.endDate.replace(' ', 'T'));
            }
        }
    }, [location.state]);

    const handleChange = (e) => {
        setEditedBook({ ...editedBook, [e.target.name]: e.target.value });
    }

    const handleDateChange = (e) => {
        if (e.target.name === 'startDate') {
            setStartDate(e.target.value);
        } else if (e.target.name === 'endDate') {
            setEndDate(e.target.value);
        }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookData = {
            bookNo: editedBook.bookNo,
            memberNo: editedBook.memberNo,
            bookPlace: editedBook.bookPlace,
            startDate: startDate.replace('T', ' '), // ISO 형식을 백엔드 형식으로 변환
            endDate: endDate.replace('T', ' '), // ISO 형식을 백엔드 형식으로 변환
            bookPurpose: editedBook.bookPurpose
        };

        // 수정된 조직도 데이터를 서버로 전송합니다.
        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/book/edit`, {
            method: 'POST',
            // body: formData
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(bookData)
            })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }
            return response.json();
        })
        .then(data => {
            alert("예약 수정 성공")
            navigate('/book/list');
        })
        .catch(error => {
            console.error('수정 실패:', error);
            alert("예약 수정 실패")
        });

    };

    return (
        <StyledBookEditDiv>
            <h2>예약 수정</h2>
            <form onSubmit={handleSubmit}>
                {/* <label>예약자명
                    <input
                         type="text"
                         name="memberNo"
                         value={editedBook.memberNo}
                         onChange={handleChange}
                    />
                </label> */}
            <label>예약자 : {loginMemberVo.name}</label>
            <br />
            <label>
                장소
                <input
                    type="text"
                    name='bookPlace'
                    value={editedBook.bookPlace}
                    onChange={handleChange} />
            </label>
            <br />
            <label>
                시작 일자
                <input type="datetime-local" name="startDate" value={startDate} onChange={handleDateChange} />
            </label>
            <br />
            <label>
                종료 일자
                <input type="datetime-local" name="endDate" value={endDate} onChange={handleDateChange} />
            </label>
            <br />
            <label>사용 목적
                <input
                        type="text"
                        name='bookPurpose'
                        value={editedBook.bookPurpose}
                        onChange={handleChange} />
            </label>
            <br />
            <button type='submit'>저장</button>
            </form>
        </StyledBookEditDiv>
    );
};

export default BookEdit;