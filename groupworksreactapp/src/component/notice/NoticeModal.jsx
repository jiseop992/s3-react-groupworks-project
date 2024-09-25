import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const StyledModal = styled.div`
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

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
`;

const StyledModalContent = styled.div`
    margin-bottom: 20px;
    text-align: left;
`;

const StyledModalHeader = styled.h2`
    margin-top: 0;
`;

const NoticeModal = ({ notice, onClose, onSave, onDelete, showEditAndDelete }) => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo")
    const [isEditing, setIsEditing] = useState(false);
    const [editedNotice, setEditedNotice] = useState(notice);

    useEffect(() => {
        setEditedNotice(notice);
    }, [notice]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setEditedNotice({ ...editedNotice, [e.target.name]: e.target.value });
    };

    // const handleEdit = () => {
    //     setIsEditing(true);
    // };

    //수정버튼 함수
    const handleEdit = () => {
        // NoticeEdit 컴포넌트로 이동
        navigate("/notice/edit", { state: { notice: notice } });
    };


    //작성(저장) 버튼 함수
    const handleSave = () => {
        onSave(editedNotice);
        setIsEditing(false);
    };

    //취소 버튼 함수
    const handleCancel = () => {
        setIsEditing(false);
        setEditedNotice(notice); // 원래 데이터로 초기화
    };

    const handleDelete = () => {
        
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            onDelete(notice.noticeNo);
        }
    };


    if (!notice) return null;

    return (
        <>
            <Overlay onClick={onClose} />
            <StyledModal>
                {isEditing ? (
                    <>
                        <input type="text" name="title" value={editedNotice.title} onChange={handleChange} />
                        <textarea name="content" value={editedNotice.content} onChange={handleChange} />
                        {/* 기타 필요한 입력 필드 추가 */}
                        <button onClick={handleSave}>저장</button>
                        <button onClick={handleCancel}>취소</button>
                    </>
                ) : (
                    <>
                <StyledModalHeader>{notice.title}</StyledModalHeader>
                <StyledModalContent>
                    <p><strong>내용:</strong> {notice.content}</p>
                    <p><strong>작성자:</strong> {notice.memberName}</p>
                    <p><strong>조회수:</strong> {notice.clickNo}</p>
                    <p><strong>첨부파일:</strong> {notice.filePath}</p>
                    <p><strong>카테고리:</strong> {notice.categoryCon}</p>
                    <p><strong>긴급 여부:</strong> {notice.emergencyYn}</p>
                    <p><strong>작성일자:</strong> {notice.enrollDate}</p>
                </StyledModalContent>
                <button onClick={onClose}>닫기</button>
                {showEditAndDelete && (
                        <>
                            <button onClick={handleEdit}>수정</button>
                            <button onClick={handleDelete}>삭제</button>
                        </>
                    )}
                </>
                )}
            </StyledModal>
        </>
    );
};

export default NoticeModal;
