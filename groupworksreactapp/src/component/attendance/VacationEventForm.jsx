import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const VacationEventForm = ( props ) => {
    let fetchType = props.type;
    let putId = props.putId;
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");
    const [halfChecked, setHalfChecked] = useState(false);

    const [ vacationVo , setVacationVo] = useState({
        no: putId,
        memberNo: loginMemberNo,
        startDate: "",
        endDate: "",
        halfDayType: ""
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setVacationVo({
            ...vacationVo,
            [name] : value
        });
    };

    const handleHalfCheck = (event) => {
        setHalfChecked(event.target.checked);
        setVacationVo({
            ...vacationVo,
            halfDayType: event.target.checked ? 'Y' : "N"
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (fetchType !== 'put') {

            fetch(`${process.env.GROUPWORKS_API_URL}/app/api/attendance/vacation`,{
                method: "POST" ,
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(vacationVo)
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
            fetch(`${process.env.GROUPWORKS_API_URL}/app/api/attendance/vacation`,{
                method: "PUT" ,
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(vacationVo)
            })
            .then( resp => resp.json())
            .then( data => {
                if(data.msg === 'okay'){
                    alert("일정 수정 완료");
                    window.location.reload();
                }else{
                    alert("일정 삭제 실패");
                }
            })
        }
    };

    return (
        <>
            <h2>휴가</h2>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>시작일</Form.Label>
                    <Form.Control size='sm' type="date" name='startDate' onChange={handleInputChange} />
                    <Form.Label>종료일</Form.Label>
                    <Form.Control size='sm' type="date"  name='endDate' onChange={handleInputChange} />
                    <Form.Check type='checkbox' label='반차사용' checked={halfChecked} name='halfDayType' onChange={handleHalfCheck} />
                </Form.Group>
                <Button variant="primary" type="submit">
                        등록
                </Button>
            </Form>
        </>
    );
};

export default VacationEventForm;