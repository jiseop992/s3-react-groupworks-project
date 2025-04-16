import React, { useState } from 'react';
// import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//전체 페이지 배경
const StyledLoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
`;

// 로그인 카드 박스
const StyledContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
              0 10px 10px rgba(0,0,0,0.22);
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 폼 스타일
const StyledFormBox = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 50px;
    width: 100%;
  }

  h1 {
    font-weight: bold;
    margin: 0;
  }

  input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
  }

  p {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 10px 0 0;
  }

  a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
  }
`;

// 버튼 디자인
const StyledButton = styled.button`
  border-radius: 20px;
  border: 1px solid #FF4B2B;
  background-color: #FF4B2B;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  margin: 5px 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;

  &:active {
    transform: scale(0.95);
  }

  &.ghost {
    background-color: transparent;
    border-color: #FF4B2B;
    color: #FF4B2B;
  }
`;

const StyledLinkButton = styled(Link)`
  border-radius: 20px;
  border: 1px solid #FF4B2B;
  background-color: transparent;
  color: #FF4B2B;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  margin: 15px 0 0 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  transition: transform 80ms ease-in, background-color 0.3s ease;

  &:hover {
    background-color: #FF4B2B;
    color: white;
  }

  &:active {
    transform: scale(0.95);
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
  const handleLoginSubmit = (isGuest = false) => {
    // event.preventDefault();

    const body = isGuest 
      ? { id: "guest", pwd: "guest"}
      : memberVo;

    fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleLoginSubmit();
  }


    return (
      <StyledLoginPage>
      <StyledContainer>
        <StyledFormBox>
          <form onSubmit={handleFormSubmit}>
            <h1>로그인</h1>
            <input
              type="text"
              placeholder="아이디"
              name="id"
              value={memberVo.id}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              placeholder="패스워드"
              name="pwd"
              value={memberVo.pwd}
              onChange={handleInputChange}
              required
            />

            <StyledButton type="submit">로그인</StyledButton>
            <StyledLinkButton to="/sign-up">회원가입</StyledLinkButton>
          </form>

          <p>포트폴리오를 통해 들어오셨다면 게스트 로그인을 클릭해주세요.</p>
          <StyledButton
              type="button"
              className="ghost"
              onClick={() => handleLoginSubmit(true)}>
              게스트 로그인
            </StyledButton>

        </StyledFormBox>
      </StyledContainer>
    </StyledLoginPage>
    );
};

export default Login;