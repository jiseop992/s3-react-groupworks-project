import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledTodoWriteDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  form {
    width: 90%;
    max-width: 500px; // 폼의 최대 너비 제한

    table {
      width: 100%; // 테이블 전체 폭 사용
      border-collapse: collapse; // 셀 간격 없애기
      
      tr {
        td:first-child {
          text-align: left; // 첫 번째 셀은 텍스트 왼쪽 정렬
          padding-right: 10px; // 라벨과 인풋 사이 간격
        }
        td {
          padding: 10px 0; // 셀 패딩
        }
        input[type="text"] {
          width: calc(100% - 100px); // 버튼 너비를 제외한 폭 사용
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-right: 10px; // 버튼과의 간격
        }
        input[type="submit"] {
          padding: 10px 20px;
          font-size: 1rem;
          border-radius: 5px;
          border: none;
          color: white;
          background: #6e8efb;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
          &:hover {
            background-color: #5a7bda;
          }
        }
      }
    }
  }
`;

const TodoWrite = ({closeModal, loadTodoVoList}) => {
    const str = sessionStorage.getItem("loginMemberNo");
    const vo = JSON.parse(str);
    const memberNo = str;
    const [inputTodoVo, setInputTodoVo] = useState({
        "writerNo" : str,
    }) 
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("http://127.0.0.1:8888/app/api/todo/write", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                ...inputTodoVo,
                memberNo: str,
            }),
        })
        .then( (resp) => resp.json() )
        .then( (data) => {
            if(data.msg === "good"){
                alert("todo 작성 완료");
                closeModal();
                loadTodoVoList();
            }else{
                alert("todo 작성 실패");
            }
        } )
        ;
    }

    const handleChangeInput = (event) => {
        const {name, value} = event.target;

        setInputTodoVo({
            ...inputTodoVo,
            [name] : value,
        });
    }
    
    return (
        <StyledTodoWriteDiv>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>Todo</td>
                            <td><input type="text" name="content" onChange={handleChangeInput}/></td>
                            <td colSpan="2"><input type="submit" value="등록" /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </StyledTodoWriteDiv>
    );
};

export default TodoWrite;