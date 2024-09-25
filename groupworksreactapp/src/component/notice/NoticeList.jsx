import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NoticeModal from './NoticeModal';
import {FaFileDownload} from 'react-icons/fa';

const StyledTableHeader = styled.th`
    &.number {
        width: 10%; // 번호의 너비
    }
    &.title {
        width: 30%; // 제목의 너비
    }
    &.file {
        width: 10%; // 제목의 너비
    }
    &.writer {
        width: 20%; // 제목의 너비
    }
    &.emergency {
        width: 10%; // 제목의 너비
    }
    &.category {
        width: 20%; // 제목의 너비
    }
    &.open {
        width: 20%; // 제목의 너비
    }
    &.enrollDate {
        width: 30%; // 제목의 너비
    }
    &.clickNo {
        width: 10%; // 제목의 너비
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    width: 100%;
    position: relative; // 상대 위치 설정
`;

const CenteredButtons = styled.div`
    display: flex;
    align-items: center;
`;

const LeftAlignedButton = styled.button`
    background-color: rgba(53, 122, 189, 0.8);
    color: white;
    border: none;
    padding: 15px 20px;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const RightAlignedButton = styled.button`
    background-color: rgba(53, 122, 189, 0.8);
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    margin-left: auto; // 오른쪽 정렬
`;

const MiddlePosition = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center; // 수평 가운데 정렬
    align-items: center; // 수직 가운데 정렬
`;
const StyledNoticeListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    /* margin-left: 15%; */
    color: #333; // 텍스트 색상 변경
    font-family: 'Arial', sans-serif; // 글꼴 변경
    & > table {
        width: 80%; // 테이블 너비 유지
        border-collapse: separate; // 테이블 테두리 분리
        border-spacing: 0 10px; // 셀 간격 조정
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); // 테이블 그림자 추가
    }
    & > table th, td {
        border: none; // 테두리 제거
        padding: 8px; // 패딩 증가
        background-color: rgba(255, 255, 255, 0.8); // 셀 배경 투명도 조정
        border-radius: 8px; // 둥근 모서리 추가
        font-size: 14px;
    }
    & > table th {
        min-width: 120px; // 헤더 최소 너비 설정
        background-color: rgba(53, 122, 189, 0.8); // 헤더 배경 투명도 조정
        color: white;
        font-size: 14px; // 글꼴 크기 변경
    }
    & > button {
        width: 10%; // 버튼 너비 조정
        background-color: rgba(53, 122, 189, 0.8); // 버튼 배경 투명도 조정
        color: white;
        border: none;
        cursor: pointer;
        margin-top: 20px;
        border-radius: 20px; // 버튼 둥근 모서리 추가
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); // 버튼 그림자 추가
    }
    & > h1 {
        font-size: 28px; // 헤더 글꼴 크기 변경
        margin-bottom: 15px; // 여백 조정
        color: #333; // 헤더 색상 변경
    }
    & th:hover, & td:hover {
        background-color: #fafad2; // 셀 호버 배경색 변경
    }

`;




// 조회수 증가 함수
const incrementClickCount = async (noticeNo) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/notice/increase-click/${noticeNo}`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('서버 오류 발생');
        }

        return true;
    } catch (error) {
        console.error('조회수 증가 요청 실패:', error);
        return false;
    }
};





const NoticeList = ({ showTopFive, showWriteButton, showPagination, showEditAndDeleteProps }) => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const navigate = useNavigate();
    //
    const [showEditAndDelete, setShowEditAndDelete] = useState(showEditAndDeleteProps);
    //
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [noticeVoList, setNoticeVoList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 페이지당 항목 수
    const [totalItems, setTotalItems] = useState(0);


    // const handleFileDownload = (filePath, e) => {
    //     e.stopPropagation(); // 상위 요소로의 이벤트 전파를 막음
    //     if (filePath) {
    //         const encodedPath = encodeURI(filePath);
    //         window.open(filePath);
    //     }
    // };
    const handleFileDownload = (filePath, e) => {
        e.stopPropagation(); // 상위 요소로의 이벤트 전파를 막음
    
        // 파일 이름만 추출
        const fileName = filePath.split('/').pop();
        // 서버에서 설정된 정적 파일 경로를 사용
        const downloadURL = `${process.env.REACT_APP_GROUPWORKS_API_URL}/resources/upload/notice/img/${fileName}`;
    
        // a 태그를 생성하여 프로그래매틱하게 클릭 이벤트를 발생시킵니다.
        const link = document.createElement('a');
        link.href = downloadURL;
        link.setAttribute('download', fileName); // 다운로드되는 파일의 이름을 지정
        document.body.appendChild(link);
        link.click();
        link.remove();
    };
    
    
 
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        
        const maxPage = Math.ceil(totalItems / itemsPerPage);
    
        // 현재 페이지가 최대 페이지보다 작을 경우에만 페이지 번호를 증가
        if (currentPage < maxPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleCloseModal = () => {
        setSelectedNotice(null);
    };
    

    



    const handleSave = (editedNotice) => {
        // API 호출 URL 설정
        const apiUrl = `${process.env.REACT_APP_GROUPWORKS_API_URL}/app/notice/edit`;
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedNotice),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }
            return response.json();
        })
        .then(data => {
            console.log('수정 성공:', data);
            alert("공지사항 수정 성공");
        })
        .catch(error => {
            console.error('수정 실패:', error);
            alert("공지사항 수정 실패");
        });
    };
    



    const loadNoticeVoList = async () => {
        const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    
        if (loginMemberNo) {
            const response = await fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/notice/list?page=${currentPage}&limit=${itemsPerPage}&memberNo=${loginMemberNo}`);
            const data = await response.json();
            if (data.voList && Array.isArray(data.voList)) {
                setTotalItems(data.totalCount); // 총 아이템 수를 설정
                const listToShow = showTopFive ? data.voList.slice(0, 5) : data.voList;
                setNoticeVoList(listToShow);
                console.log(noticeVoList);
            } else {
                console.error('Data is not an array:', data);
                setNoticeVoList([]);
            }
        } else {
            console.error('No user number found');
            setNoticeVoList([]);
        }
    };

    const handleNoticeClick = async (notice) => {
        const success = await incrementClickCount(notice.noticeNo);
    
        if (success) {
            await loadNoticeVoList();
            const updatedNotice = noticeVoList.find(n => n.noticeNo === notice.noticeNo);

            //
            const loginMemberNo = sessionStorage.getItem("loginMemberNo");
            const canEditDelete = notice.memberNo === loginMemberNo;
            //

            setSelectedNotice(updatedNotice);
            //
            setShowEditAndDelete(canEditDelete);
            //
        } else {
            setSelectedNotice(notice);
        }
    };

    const handleDelete = noticeNo => {
        const loginMemberNo = sessionStorage.getItem("loginMemberNo");
        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/notice/delete/${noticeNo}?memberNo=${loginMemberNo}`, {
            method: 'DELETE',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }
            return response.text(); // 이 경우, 서버 응답이 JSON이 아닐 수 있으므로 text() 사용
        })
        .then(data => {
            console.log('삭제 성공:', data);
            alert("공지사항 삭제 성공");
            handleCloseModal();
            loadNoticeVoList();
            // setNoticeVoList(noticeVoList.filter(notice => notice.noticeNo !== noticeNo));
        })
        .catch(error => {
            console.error('삭제 실패:', error);
            alert("공지사항 삭제 실패");
        });
    };

    

    useEffect( () => {
        // console.log("useEffect 호출");
        loadNoticeVoList();
    }, [showTopFive, currentPage] );


    const renderPagination = () => {
        if (!showPagination) {
            return null; // 페이징을 표시하지 않음
        }
        
        const maxPage = Math.ceil(totalItems / itemsPerPage);

        return (
            <ButtonContainer>
                <MiddlePosition>
                <CenteredButtons>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>이전</button>
                <span>{currentPage} / {maxPage}</span>
                <button onClick={handleNextPage} disabled={currentPage === maxPage}>다음</button>
                </CenteredButtons>
                </MiddlePosition>
            </ButtonContainer>
        );
    };
    
    
    return (
        <StyledNoticeListDiv>
            {showWriteButton && <RightAlignedButton onClick={() => navigate("/notice/insert")}>작성하기</RightAlignedButton>}
            
            <table>
                <thead>
                    <tr>
                        <StyledTableHeader className='number'>번호</StyledTableHeader>
                        <StyledTableHeader className='title'>제목</StyledTableHeader>
                        <StyledTableHeader className='file'>파일</StyledTableHeader>
                        <StyledTableHeader className='writer'>작성자</StyledTableHeader>
                        <StyledTableHeader className='emergency'>긴급여부</StyledTableHeader>
                        <StyledTableHeader className='category'>카테고리</StyledTableHeader>
                        <StyledTableHeader className='open'>공개부서</StyledTableHeader>
                        <StyledTableHeader className='enrollDate'>작성일자</StyledTableHeader>
                        <StyledTableHeader className='clickNo'>조회수</StyledTableHeader>
                    </tr>
                </thead>
                <tbody>
                    {
                        noticeVoList.length===0
                        ?
                        <tr><td colSpan="9">로딩 중...</td></tr>
                        :
                        noticeVoList.map( notice => (
                            // notice.deleteYn === 'y' ? null : (
                            <tr key={notice.noticeNo} onClick={() => handleNoticeClick(notice)}>
                            <td>{notice.noticeNo}</td>
                            <td>{notice.title}</td>
                            <td>
                                {notice.filePath && (
                                        <FaFileDownload 
                                            onClick={(e) => handleFileDownload(notice.filePath, e)}
                                            // onClick={(e) => handleFileDownload(notice.filePath.split('/').pop(), e)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                )}
                            </td>
                            <td>{notice.memberName}</td>
                            <td>{notice.emergencyYn}</td>
                            <td>{notice.categoryCon}</td>
                            <td>{notice.departName}</td>
                            <td>{notice.updateDate ? `(${notice.updateDate})` : notice.enrollDate}</td>
                            <td>{notice.clickNo}</td>
                        </tr>
                            ))
                            // )
                    }
                </tbody>
            </table>
            {selectedNotice && (
                <NoticeModal 
                notice={selectedNotice} 
                onClose={handleCloseModal} 
                onSave={handleSave}
                onDelete={handleDelete}
                showEditAndDelete={showEditAndDelete}
                />
                )}
            
            {renderPagination()}
        </StyledNoticeListDiv>
    );
};

export default NoticeList;