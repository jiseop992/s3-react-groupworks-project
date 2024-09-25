import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StyledSignUpDiv = styled.div`
    height: 100vh;
    /* background-color: #61dafb; */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledSignUpForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 30vw;
    height: 90vh;
    align-items: center;
    justify-content: center;
    background-color: #effcff;
    border: 3px solid #61dafb;
    border-radius: 15%;
`;

const AddMember = () => {
    const location = useLocation();
    const cNo = location.state.cNo;
    const [departList, setDepartList] = useState([]);
    const [positionList, setPositionList] = useState([]);

    useEffect( () => {
        fetch(`http://127.0.0.1:8888/app/api/member/list/depart`)
        .then( (resp) => { return resp.json() })
        .then( (data) => {
          setDepartList(data.departList);
        });
    
        fetch(`http://127.0.0.1:8888/app/api/member/list/position`)
        .then( (resp) => { return resp.json() })
        .then( (data) => {
          setPositionList(data.positionList);
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

    const [memberVo, setMemberVo] = useState({
        name: "",
        id : "",
        pwd: "",
        departNo: "",
        companyNo: cNo,
        positionNo: ""
    });


    // 멤버 데이터 저장
    const handleInputChange = (event) => {
        const {name , value} = event.target;
    
        setMemberVo({
        ...memberVo ,
        [name] : value
        });
    };

    // id 중복확인
    const handleIdCheck = () => {
        let idStr = memberVo.id;
        fetch(`http://127.0.0.1:8888/app/api/member/check-id?id=${idStr}`)
        .then( resp => resp.json() )
        .then( data => {
        if(data.msg === 'nope'){
            alert("사용가능한 아이디 입니다.");
        }else if(data.msg === 'okay') {
            alert("중복된 아이디입니다. 다른 아이디를 입력해주세요.");
        }
        });
    }

    //Add Api 호출
    const handleJoinSubmit = (event) => {
        event.preventDefault();
        fetch("http://127.0.0.1:8888/app/api/member/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(memberVo)
        })
        .then( resp => resp.json())
        .then( data => {
        if(data.msg === 'okay'){
            alert("구성원추가 완료!");
            window.location.reload();
        }else{
            alert('구성원 추기 실패');
        }
        })
    };

    return (
        <StyledSignUpDiv>
            <StyledSignUpForm>
                <h1>구성원 추가</h1>
                <Form onSubmit={handleJoinSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>구성원 이름</Form.Label>
                        <Form.Control size='sm' type="text" placeholder="이름" name='name' onChange={handleInputChange} />

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>구성원 ID</Form.Label>
                        <Form.Control size='sm' type="text" placeholder="ID" name='id'onChange={handleInputChange} />
                        <Form.Text className="text-muted">
                            4글자 이상의 아이디를 입력후, 중복체크를 해주세요.
                        </Form.Text>
                        <Button size='sm' variant="primary" onClick={handleIdCheck}>
                            중복체크
                        </Button>
                    </Form.Group>

                        <Form.Label>구성원 Password</Form.Label>
                        <Form.Control size='sm' type="password" placeholder="Password" name='pwd' onChange={handleInputChange} />

                        <Form.Label>구성원 부서</Form.Label>
                        <ListSelectBox prop="depart" list={departList} />

                        <Form.Label>구성원 직책</Form.Label>
                        <ListSelectBox prop="position" list={positionList} />

                    </Form.Group>
                    <Button variant="primary" type="submit">
                        추가
                    </Button>
                </Form>
            </StyledSignUpForm>
        </StyledSignUpDiv>
    );
};

export default AddMember;