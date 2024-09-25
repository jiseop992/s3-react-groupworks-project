import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookModal from './BookModal';
import { useNavigate } from 'react-router-dom';

const StyledBookListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin-left: 50%;
    color: #333; // 텍스트 색상 변경
    font-family: 'Open Sans', sans-serif;
    border-radius: 5px;
    & > table {
        width: 80%; // 테이블 너비 유지
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1); // 테이블 그림자 추가
    }
    & > table th, td {
        padding: 8px; // 패딩 증가
        background-color: rgba(255, 255, 255, 0.9); // 셀 배경 투명도 조정
        font-size: 14px;
    }
    & > table th {
        min-width: 120px; // 헤더 최소 너비 설정
        background-color: rgba(135, 182, 229, 0.8);
        color: white;
        font-size: 14px; 
        border-radius: 5px;
    }
    & > button {
        width: 10%; // 버튼 너비 조정
        background-color: rgba(135, 182, 229, 0.8); // 버튼 배경 투명도 조정
        color: white;
        border: none;
        cursor: pointer;
        margin-top: 20px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); // 버튼 그림자 추가
    }
    & > h1 {
        font-size: 28px; // 헤더 글꼴 크기 변경
        margin-bottom: 15px; // 여백 조정
        color: #333; // 헤더 색상 변경
    }
`;

const Button = styled.button`
    width: 10%; // 버튼 너비 조정
    background-color: rgba(135, 182, 229, 0.8); // 버튼 배경 투명도 조정
    color: white;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); // 버튼 그림자 추가
    border-radius: 5px; // 버튼 둥근 모서리 추가
    padding: 10px 0; // 패딩 추가
    font-family: 'Open Sans', sans-serif; // 폰트 스타일 추가
    transition: background-color 0.2s ease-in-out; // 부드러운 색상 변경 효과

    &:hover {
        background-color: rgba(105, 152, 209, 0.9); // 호버 시 배경 색상 변경
    }
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: separate; // collapse에서 separate로 변경
    margin-bottom: 20px; // 각 테이블 사이의 간격
    border-spacing: 0; // 셀 사이의 간격 제거

    & th, & td {
        border-bottom: 1px solid black; // 아래쪽 테두리 추가
        padding: 8px;
        text-align: center;
    }

    & .depart-header {
        background-color: lightgray; // 헤더 배경색
        font-size: 1.2em; // 헤더 폰트 사이즈
        border-radius: 5px;
    }
`;

const BookList = () => {

    const [bookVoList, setBookVoList] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchName, setSearchName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const loginMemberName = sessionStorage.getItem("loginMemberName");


    const loadBookVoList = async (startDate, endDate, searchName = '') => {
        try {
            const queryStartDate = startDate === '' ? null : startDate;
            const queryEndDate = endDate === '' ? null : endDate;
            const response = await fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/book/list?startDate=${startDate}&endDate=${endDate}&memberName=${encodeURIComponent(searchName)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.voList && Array.isArray(data.voList)) {
                setBookVoList(data.voList);
            } else {
                console.error('Data is not an array:', data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
        useEffect(() => {
            console.log('Effect running with:', { startDate, endDate, searchName });
            loadBookVoList(startDate, endDate, searchName); // 컴포넌트 마운트 시 예약 정보를 불러옵니다.
        }, [startDate, endDate, searchName]);


        const handleSearchNameChange = (e) =>{
            setSearchName(e.target.value);
            loadBookVoList(startDate || null, endDate || null, e.target.value);
        };



    const handleDateChange = (e) => {
        if (e.target.name === 'startDate') {
            setStartDate(e.target.value);
        } else if (e.target.name === 'endDate') {
            setEndDate(e.target.value);
        }
        loadBookVoList(e.target.name === 'startDate' ? e.target.value : startDate, e.target.name === 'endDate' ? e.target.value : endDate, searchName);
    };

    const handleSearch = () => {
        if (startDate && endDate || searchName) {
            loadBookVoList(startDate, endDate, searchName);
        }
    };

    
    const handleBookWrite = () => {
        // setShowModal(!showModal);
        navigate('/book/insert');
    };

    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedVo, setSelectedVo] = useState(null);

    const openModal = (vo) => {
        setIsOpen(true);
        setSelectedVo(vo);
    }

    const closeModal = () => {
        setIsOpen(false);
        setSelectedVo(null);
    }

    const navigateToEdit = () => {
        navigate(`/book/edit`, { state: { selectedVo } });
        closeModal();
    }

    // 목록을 새로 고치는 함수
    const refreshList = async () => {
        await loadBookVoList(startDate, endDate, searchName);
    };

    return (
        <StyledBookListDiv>
            <h1>예약 조회</h1>
            <button onClick={handleBookWrite}>예약 신청</button>
            {showModal && <BookModal closeModal={handleBookWrite} userName={loginMemberName}/>}
            {/* <div>
                <label>
                    예약자명:
                    <input type="text" value={searchName} onChange={handleSearchNameChange} />
                </label>
            </div> */}
            <div>
                <label>
                    시작 날짜:
                    <input type="date" name="startDate" value={startDate} onChange={handleDateChange} />
                </label>
                <label>
                    종료 날짜:
                    <input type="date" name="endDate" value={endDate} onChange={handleDateChange} />
                </label>
                <label>
                    예약자명:
                    <input type="text" value={searchName} onChange={handleSearchNameChange} />
                </label>
            </div>
            <StyledTable>
                <thead>
                    <tr>
                        <th>예약 번호</th>
                        <th>예약자명</th>
                        <th>장소</th>
                        <th>언제부터</th>
                        <th>언제까지</th>
                        <th>사용 목적</th>
                        <th>예약시간</th>
                    </tr>
                </thead>
                <tbody>
                    { bookVoList.length > 0 ? (
                        bookVoList.map(book => (
                            <tr key={book.bookNo} onClick={() => openModal(book)}>
                                <td>{book.bookNo}</td>
                                <td>{book.memberName}</td>
                                <td>{book.bookPlace}</td>
                                <td>{book.startDate}</td>
                                <td>{book.endDate}</td>
                                <td>{book.bookPurpose}</td>
                                <td>{book.updateDate ? book.updateDate : book.bookDate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">해당 기간 등록된 예약 정보가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <BookModal
                modalIsOpen={modalIsOpen}
                selectedVo={selectedVo}
                closeModal={closeModal}
                navigateToEdit={navigateToEdit}
                refreshList={refreshList}
                book={selectedVo}
            />
        </StyledBookListDiv>
    );
};

export default BookList;
