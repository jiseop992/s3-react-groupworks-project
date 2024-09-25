import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const BusinessTripEventFrom = ( props ) => {
    let fetchType = props.type;
    let putId = props.putId;
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");

    const [ businessTripVo , setBusinessTripVo] = useState({
        no: putId,
        memberNo: loginMemberNo,
        startDate: "",
        endDate: "",
        memo: ""
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setBusinessTripVo({
            ...businessTripVo,
            [name] : value
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(fetchType);
        
        if (fetchType !== "put") {

            fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/attendance/business-trip`,{
                method: "POST" ,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(businessTripVo)
            })
            .then( resp => resp.json())
            .then( data => {
                if(data.msg === 'okay'){
                    alert("일정등록 완료");
                    window.location.reload();
                }else{
                alert("일정등록 실패");
                }
            })
        } 
        else {
           
            fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/attendance/business-trip`,{
                method: "PUT" ,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(businessTripVo)
            })
            .then( resp => resp.json())
            .then( data => {
                if(data.msg === 'okay'){
                    alert("일정 수정 완료");
                    window.location.reload();
                }else{
                    alert("일정 수정 실패");
                }
            })
        };
    }
    return (
        <>
            <h2>출장</h2>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>시작일</Form.Label>
                    <Form.Control size='sm' type="date" name='startDate' onChange={handleInputChange} />
                    <Form.Label>종료일</Form.Label>
                    <Form.Control size='sm' type="date" name='endDate' onChange={handleInputChange} />
                    <Form.Label>메모/비고</Form.Label>
                    <Form.Control size='sm' type="text" placeholder="메모/비고 를 입력하세요." name='memo' onChange={handleInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    등록
                </Button>
            </Form>
        </>
    );
};

export default BusinessTripEventFrom;