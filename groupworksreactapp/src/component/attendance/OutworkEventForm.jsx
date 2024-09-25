import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const OutworkEventForm = ( props ) => {
    let fetchType = props.type;
    let putId = props.putId;

    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const [startChecked, setStartChecked] = useState(false);
    const [endChecked, setEndChecked] = useState(false);

    const [ outSideWorkVo , setOutSideWorkVo] = useState({
        no: putId,
        memberNo: loginMemberNo,
        startTime: "",
        endTime: "",
        onsiteStart: "N",
        onsiteEnd: "N",
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        let newValue;
        if(name === 'startTime' || name === 'endTime' ){
            newValue = value.replace("T", " ");
        } else {
            newValue = value;
        }

        setOutSideWorkVo({
            ...outSideWorkVo,
            [name] : newValue
        });
    };

    const handleStartCheck = (event) => {
        setStartChecked(event.target.checked);
        setOutSideWorkVo({
            ...outSideWorkVo,
            onsiteStart: event.target.checked ? 'Y' : "N"
        });
    };

    const handleEndCheck = (event) => {
        setEndChecked(event.target.checked);
        setOutSideWorkVo({
            ...outSideWorkVo,
            onsiteEnd: event.target.checked ? 'Y' : "N"
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if(fetchType !== 'put') {

            fetch("http://127.0.0.1:8888/app/api/attendance/outside-work",{
                method: "POST" ,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(outSideWorkVo)
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
        } else {

            fetch("http://127.0.0.1:8888/app/api/attendance/outside-work",{
                method: "PUT" ,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(outSideWorkVo)
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
        }
    };

    return (
        <>
            <h2>외근</h2>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>시작시간</Form.Label>
                    <Form.Control size='sm' type="datetime-local" name='startTime' onChange={handleInputChange}/>
                    <Form.Label>종료시간</Form.Label>
                    <Form.Control size='sm' type="datetime-local" name='endTime' onChange={handleInputChange}/>
                    <Form.Check type='checkbox'label="현지출근" checked={startChecked} name='onsiteStart' onChange={handleStartCheck}/>
                    <Form.Check type='checkbox'label="현지퇴근" checked={endChecked} name='onsiteEnd' onChange={handleEndCheck}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    등록
                </Button>
            </Form>
        </>
    );
};

export default OutworkEventForm;