import React from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


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
    h2 {
        text-align: center; // h2 태그 내용만 가운데 정렬
    }
    
    .button-container {
        text-align: center; // 버튼을 오른쪽으로 정렬
    }
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

// function groupByDepartmentName(list) {
//     // return list.reduce((acc, vo) => {
//     //     if (!acc[vo.departNo]) {
//     //         acc[vo.departNo] = [];
//     //     }
//     //     acc[vo.departNo].push(vo);
//     //     return acc;
//     // }, {});
//     return list.reduce((acc, member) => {
//         // 여기서 member.departName은 부서 이름을 나타냅니다. 실제 필드명에 맞게 조정해야 합니다.
//         const departmentName = member.departmentName;

//         if (!acc[departmentName]) {
//             acc[departmentName] = [];
//         }
//         acc[departmentName].push(member);
//         return acc;
//     }, {});
// }

const OrganModal = ({ modalIsOpen, selectedVo, closeModal, navigateToEdit, onDelete, organ }) => {
    const navigate = useNavigate();
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");

    const navigateToDelete = () => {
        if (selectedVo && selectedVo.no && window.confirm("정말로 삭제하시겠습니까?")) {
            onDelete(selectedVo.no);
            closeModal();
        }
    };
    

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="부서원 정보"
            style={{ overlay: {}, content: {
                background: 'none',
                border: 'none',
                padding: 0
            } }}
        >
            <StyledModal>
            {selectedVo && (
                <div>
                    <h2>{selectedVo.name}</h2>
                    <br />
                    <p>부서: {selectedVo.departName}</p>
                    <p>직책: {selectedVo.positionName}</p>
                    <p>번호: {selectedVo.tel}</p>
                    <p>이메일: {selectedVo.email}</p>
                    <div className="button-container">
                    {/* <button onClick={navigateToEdit}>수정</button>
                    <button onClick={navigateToDelete}>삭제</button> */}
                    <button onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}
            </StyledModal>
        </Modal>
    );
};

export default OrganModal;
