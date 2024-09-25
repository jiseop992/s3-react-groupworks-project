import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledLoginDiv = styled.div`
    height: 100vh;
    background-color: #61dafb;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyeldLoginForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    width: 30%;
    height: 50%;
    background-color: #effcff;
    border: 1px solid white;
    border-radius: 10%;
    color: #2c5e6c;
    font-size: 2rem;
    & > label {
        color: black;
        font-size: 1rem;
    }
`;
const Login = () => {

    const navigate = useNavigate();
    const [memberVo , setMemberVo] = useState({
        id : "" ,
        pwd : ""
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        
        setMemberVo( {
            ...memberVo ,
            [name] : value
        } );
    };

    // API 호출
    const handleLoginSubmit = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(memberVo)
    })
    .then( resp => resp.json() )
    .then( data => {
      if(data.msg === 'okay') {
        sessionStorage.setItem("loginMemberNo", data.loginMemberNo);
        navigate("/");
      }else if(data.errorMsg === 'NoData'){
        alert("로그인 실패, 조회결과가 없습니다.");
      }
    } )
  };

    return (
        <StyledLoginDiv>
            <StyeldLoginForm>
                <h1>로그인</h1>
                    <Form onSubmit={handleLoginSubmit}>
                         <Form.Group className="mb-3" controlId="formBasicEmail">
                         <Form.Label>아이디</Form.Label>
                         <Form.Control type="text" placeholder="ID" name='id' onChange={handleInputChange} />
                        
                         <Form.Label>패스워드</Form.Label>
                         <Form.Control  type="password" placeholder="PassWord" name='pwd' onChange={handleInputChange} />
                     </Form.Group>
                     <Button variant="primary" type="submit">
                        LOGIN
                    </Button>
                    </Form>

                <label>신규 서비스 이용자시면, 아래에 회사등록을 이용하시길 바랍니다.</label>
                <Link to="/sign-up">이동하기</Link>
            </StyeldLoginForm>
        </StyledLoginDiv>
    );
};

export default Login;