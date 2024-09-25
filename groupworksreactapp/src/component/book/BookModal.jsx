import Modal from 'react-modal';
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 1000;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 500px;
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
`;

const BookModal = ({ modalIsOpen, selectedVo, closeModal, refreshList }) => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo")
    const navigate = useNavigate();
    
    const navigateToEdit = () => {
        navigate(`/book/edit`, { state: { selectedVo } }); // selectedVo가 올바른지 확인
        closeModal();
    }

    const navigateToDelete = async () => {
        if (window.confirm('예약을 삭제하시겠습니까?')) {
            try {
                const response = await fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/book/delete/${selectedVo.bookNo}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('서버 오류 발생');
                }

                alert('예약이 삭제되었습니다.');
                closeModal();
                if (refreshList) {
                    refreshList(); // 부모 컴포넌트에서 목록을 새로 고치는 함수
                }

            } catch (error) {
                console.error('삭제 실패:', error);
                alert('예약 삭제 실패');
            }
        }
    };


    return (
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="상세 조회"
        style={{ overlay: {}, content: {
            background: 'none',
            border: 'none',
            padding: 0
        } }}
        >
            <StyledModal>
                <h2>상세 조회</h2>
                {selectedVo && (
                    <div>
                        <p>예약 번호: {selectedVo.bookNo}</p>
                        <p>예약자명: {selectedVo.memberName}</p>
                        <p>언제부터: {selectedVo.startDate}</p>
                        <p>언제까지: {selectedVo.endDate}</p>
                        <p>사용 목적: {selectedVo.bookPurpose}</p>
                        {selectedVo.memberNo === loginMemberNo && (
                            <>
                                <button onClick={navigateToEdit}>수정</button>
                                <button onClick={navigateToDelete}>삭제</button>
                            </>
                        )}
                        <button onClick={closeModal}>닫기</button>
                    </div>
                )}
            </StyledModal>
        </Modal>
    );
};

export default BookModal;
//
