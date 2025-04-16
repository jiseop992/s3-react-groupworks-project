import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 2열로 나누기 위한 스타일 추가
const StyledFormInner = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

const StyledFormColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  input, select {
    margin: 8px 0;
  }
`;

//전체 페이지 배경
const StyledSignUpPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
    height: 100vh;
    margin: -20px 0 50px;
`;

//회원가입 카드 박스
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
  width: 75%;
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
    margin: 20px 0 20px 0;
  }

  input, select {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    border-radius: 8px;
    font-size: 16px;
  }

  select {
    background-color: #eee;
    border-radius: 8px;
    font-size: 16px;
    color: #333;
    cursor: pointer;
  }


  p {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
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

// 회사 등록 버튼 스타일 수정
const StyledCompanyButton = styled(StyledButton)`
  background-color: #FF4B2B;
  color: white;
  width: 50%; 
  font-size: 14px;
  margin-top: 10px; 
  padding: 12px 15px;
  margin-left: auto;
  &:active {
    transform: scale(0.98);
  }
`;

const SignUp = () => {
    const navigate = useNavigate();
    const [departList, setDepartList] = useState([]);
    const [positionList, setPositionList] = useState([]);

    const [memberVo, setMemberVo] = useState({
        name: "",
        id : "",
        pwd: "",
        email: "",
        tel: "",
        address: "",
        departNo: "",
        companyNo: "",
        positionNo: ""
    });

    const [companyVo, setCompanyVo] = useState({
        name:"",
    });

    useEffect( () => {
       
        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/member/list/depart`)
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'okay') {
                setDepartList(data.departList);
            }
            else {
                alert("사원 목록 로드 실패");
            }
        });

        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/member/list/position`)
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'okay') {
                setPositionList(data.positionList);
            }
            else {
                alert("사원 목록 로드 실패");
            }
        });
    }, []);

    // 옵션 리스트 생성
    const ListSelectBox = ( {prop, list} ) => {
        return (
            <Form.Select name={`${prop}No`} value={memberVo[`${prop}No`]} onChange={handleInputChange} >
                <option value=''>목록</option>
            {
                list.map( (data) => {
                    return <option key={data.name} value={data.no}>{data.name}</option>;
                } )
            }
            </Form.Select>
        );
    };
    

    const handleInputCompany = (event) => {
        const {name , value} = event.target;
        
        setCompanyVo({
          ...companyVo ,
          [name] : value
        });
    }

    // 멤버 데이터 저장
    const handleInputChange = (event) => {
        const {name , value} = event.target;
    
        setMemberVo({
        ...memberVo ,
        [name] : value
        });
    };

    // 회사 등록
    const handleCompanyAdd = () => {
        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/company`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(companyVo)
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'okay') {
                const cNo = data.companyNo;
                setMemberVo({
                    ...memberVo ,
                    companyNo : cNo
                })
              alert("회사명 추가 완료 !");
            } else{
            alert("회사명 추가 실패");
            }
          })
    };

    // id 중복확인
    const handleIdCheck = () => {
        let idStr = memberVo.id;
        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/member/check-id?id=${idStr}`)
        .then( resp => resp.json() )
        .then( data => {
        if(data.msg === 'nope'){
            alert("사용가능한 아이디 입니다.");
        }else if(data.msg === 'okay') {
            alert("중복된 아이디입니다. 다른 아이디를 입력해주세요.");
        }
        });
    }

    //Join Api 호출
    const handleJoinSubmit = (event) => {
        event.preventDefault();

        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/member/sign-up`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(memberVo)
        })
        .then( resp => resp.json())
        .then( data => {
        if(data.msg === 'okay'){
            alert("회원가입 완료!");
            navigate("/login");
        }else{
            alert('회원가입 실패');
        }
        })
    };

    return (
        <StyledSignUpPage>
        <StyledContainer>
          <StyledFormBox>
            <form onSubmit={handleJoinSubmit}>
                <h1>회원가입</h1>

                <StyledFormInner>
                    <StyledFormColumn>
                        <input
                            type="text"
                            placeholder="이름"
                            name="name"
                            value={memberVo.name}
                            onChange={handleInputChange}
                            required
                        />
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
                        <input
                            type="email"
                            placeholder="이메일"
                            name="email"
                            value={memberVo.email}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            placeholder="연락처"
                            name="tel"
                            value={memberVo.tel}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            placeholder="주소"
                            name="address"
                            value={memberVo.address}
                            onChange={handleInputChange}
                            required
                        />
                    </StyledFormColumn>
                    <StyledFormColumn>
                        
                        <select
                            name="departNo"
                            value={memberVo.departNo}
                            onChange={handleInputChange}
                            required
                            >
                            <option value="">부서를 선택하세요</option>
                            {departList.map(depart => (
                                <option key={depart.no} value={depart.no}>{depart.name}</option>
                            ))}
                        </select>

                        <select
                            name="positionNo"
                            value={memberVo.positionNo}
                            onChange={handleInputChange}
                            required
                        >
                        <option value="">직책을 선택하세요</option>
                            {positionList.map(position => (
                                <option key={position.no} value={position.no}>{position.name}</option>
                            ))}
                        </select>

                        <input
                            type="text"
                            placeholder="회사명을 입력해주세요."
                            name="name"
                            value={companyVo.name}
                            onChange={handleInputCompany}
                            required
                        />
                        <StyledCompanyButton type="button" onClick={handleCompanyAdd}>
                            회사 등록
                        </StyledCompanyButton>

                    </StyledFormColumn>
                </StyledFormInner> 
              <StyledButton type="submit">가입하기</StyledButton>
            </form>
  
            <p>이미 계정이 있으신가요?</p>
            <StyledLinkButton to="/login">로그인</StyledLinkButton>
          </StyledFormBox>
        </StyledContainer>
      </StyledSignUpPage>
    );
};

export default SignUp;