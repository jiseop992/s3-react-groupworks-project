import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import TodoWrite from './TodoWrite';

const StyledTodoDiv = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
  & > table {
    width: 100%; 
    height: 100%;
    border-collapse: collapse; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    th, td {
      padding: 8px; 
      border: none;
      text-align: center; 
      border-radius: 8px;
    }
    th {
      border: none;
      min-width: 160px;
      background-color: #6e8efb; // 테이블 헤더 배경색 조정
      color: white; 
    }

    td {
        border: none;
    }
    
    tr:nth-child(odd) {
      background-color: #fafafa; 
    }
    tr:hover {
      background-color: #f1f1f1; 
    }
    .delete-btn {
    background-color: #6e8efb;
    }
  }
  button {
    padding: 8px 16px;
    margin: 0 5px; 
    border: none;
    border-radius: 20px; 
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s; 
    &:hover {
      background-color: #6e8efb; 
    }
  }
  & > button {
    width: auto; 
    font-size: 1rem; 
    background-color: #6e8efb; 
    margin-top: 20px; 
  }
`;

const TodoList = () => {

    const loginMemberNo = sessionStorage.getItem('loginMemberNo');
    const navigate = useNavigate();
    const [memberNo, setMemberNo] = useState(loginMemberNo);
    const [todoVoList, setTodoVoList] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
        if (todoVoList.length >= 5) {
            alert('최대 5개의 Todo만 등록 가능합니다. 필요시 기존 항목을 삭제하세요.');
            setModalIsOpen(false);
        } else {
            setModalIsOpen(true); 
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const loadTodoVoList = () => {
        fetch(`http://127.0.0.1:8888/app/api/todo/list?memberNo=${memberNo}`)
        .then( resp => resp.json() )
        .then(data => {
            if(data.msg === "good"){
                setTodoVoList(data.todoList);
            }else {
                console.log("목록 가져오기 실패");
            }
        })
        ;
    }

    useEffect( () => {
        loadTodoVoList();
    }, [memberNo] );

    const handleDelete = (todoNo) => {
        fetch(`http://127.0.0.1:8888/app/api/todo/delete`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({no: todoNo, memberNo: loginMemberNo}),
        })
        .then( (resp) => resp.json() )
        .then( (data) => {
            if(data.msg === 'good'){
                alert('todo 삭제 완료');
                loadTodoVoList();
            }else{
                alert('todo 삭제 실패');
            }
        } );
    };

    return (
        <StyledTodoDiv>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>Todo</th>
                        <th>작성일자</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todoVoList.length === 0
                        ?
                        <tr>
                            <td colSpan="4">Todo 리스트 항목이 없습니다.</td>
                        </tr>
                        :
                        todoVoList.map( vo => <tr key = {vo.no}>
                            <td>{vo.no}</td>
                            <td>{vo.content}</td>
                            <td>{vo.writeDate}</td>
                            <td><button className="delete-btn" onClick={() => handleDelete(vo.no)}>삭제</button></td>
                        </tr>
                        )
                    }
                </tbody>
            </table>

            <button onClick={openModal}>Todo 추가</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Todo Write Modal"
                style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.75)',
                      display: 'flex', 
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: '1000'
                    },
                    content: {
                        position: 'relative',
                        inset: 'auto',
                        margin: 'auto',
                        border: '1px solid #ccc', // 모달 테두리를 은은한 회색으로 설정
                        borderRadius: '10px', // 모달 모서리를 부드럽게 둥글게 설정
                        padding: '20px', // 모달 내부 패딩 설정
                        background: 'white', // 모달 배경색 설정
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)', // 모달에 그림자 효과 추가
                        width: '50%', // 모달 너비를 화면의 50%로 설정
                        maxWidth: '640px', // 모달 최대 너비 설정
                        height: 'auto', // 높이를 내용에 맞추어 자동으로 설정
                        overflow: 'auto', // 내용이 많을 경우 스크롤 생성
                        textAlign: 'left', // 텍스트 왼쪽 정렬
                        fontFamily: 'Arial, sans-serif', // 폰트 설정
                        fontSize: '1rem', // 폰트 크기 설정
                        color: '#444', // 글자 색상 설정
                      }
                  }}
            >
                
                <TodoWrite closeModal={closeModal} loadTodoVoList={loadTodoVoList} />
                <button onClick={closeModal}
                style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    borderRadius: '5px',
                    border: 'none',
                    color: 'white',
                    background: '#6e8efb', // 버튼 배경색을 파란색 계열로 설정
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // 버튼에 그림자 효과 추가
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out' // 부드러운 상태 변화를 위한 전환 효과 추가
                  }}>닫기</button>
            </Modal>
        </StyledTodoDiv>   
    );
};

export default TodoList;