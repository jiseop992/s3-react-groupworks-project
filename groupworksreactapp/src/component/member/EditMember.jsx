import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ReactModal from 'react-modal';
import styled from 'styled-components';

const StyledEditDiv = styled.div`
`;

const EditMember = ( {memberNo , openModal, handleCloseModal} ) => {
    const [loginVo, setLoginVo] = useState([]);
    const [editVo, setEditVo] = useState({
        no : memberNo
    });

    useEffect( () => {
        fetch(`${process.env.GROUPWORKS_API_URL}/app/api/member/${memberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            setLoginVo(data.loginMemberVo);
        });
    })

    const handleSubmit = () => {
        fetch(`${process.env.GROUPWORKS_API_URL}/app/api/member/`, {
            method: "PUT" ,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editVo)
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'okay'){
                alert("회원정보 수정 완료 !");
                window.location.reload();
            } else {
                alert("회원정보 수정 실패 재시도 바랍니다.");
                window.location.reload();
            }
        })
    };

    const handleInputChange = (event) => {
        const {name , value} = event.target;
    
        setEditVo({
        ...editVo ,
        [name] : value
        });
    };
    return (
        <StyledEditDiv>
            <ReactModal isOpen={openModal} onRequestClose={handleCloseModal} style={ {
                            overlay: {
                                backgroundColor: "rgba(0, 0, 0, 0.4)",
                                width: "100%",
                                height: "100vh",
                                zIndex: "10",
                                position: "fixed",
                                top: "0",
                                left: "0",
                            },
                            content: {
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "400px",
                                height: "600px",
                                zIndex: "150",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                borderRadius: "10px",
                                boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
                                backgroundColor: "white",
                                justifyContent: "center",
                                overflow: "auto",
                                },
                            } }
            >
                <h2>개인정보 수정</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center'}}>
                    <Form.Label>이름 :</Form.Label>
                    <Form.Control size='sm' type="text" placeholder={loginVo.name} name='name' className='w-50' onChange={handleInputChange}/>
                    <Button onClick={handleSubmit}>수정</Button>
                </div>

                <br/>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Form.Label>아이디 :</Form.Label>
                    <Form.Control size='sm' type="text" placeholder={loginVo.id} name='id' className='w-50' onChange={handleInputChange}/>
                    <Button onClick={handleSubmit}>수정</Button>
                </div>

                <br/>

                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Form.Label>패스워드 :</Form.Label>
                    <Form.Control size='sm' type="text" placeholder="패스워드" name='pwd' className='w-50' onChange={handleInputChange}/>
                    <Button onClick={handleSubmit}>수정</Button>
                </div>

                <br/>

                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Form.Label>이메일 :</Form.Label>
                    <Form.Control size='sm' type="email" placeholder={loginVo.email} name='email' className='w-auto' onChange={handleInputChange}/>
                    <Button onClick={handleSubmit}>수정</Button>
                </div>

                <br/>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Form.Label>연락처 :</Form.Label>
                    <Form.Control size='sm' type="text" placeholder={loginVo.tel} name='tel' className='w-50' onChange={handleInputChange}/>
                    <Button onClick={handleSubmit}>수정</Button>
                </div>

                <br />

                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Form.Label>연차 :</Form.Label>
                    <Form.Control size='sm' type="text" placeholder={loginVo.annual} name='annual' className='w-50' onChange={handleInputChange}/>
                    <Button onClick={handleSubmit}>수정</Button>
                </div>

                <br />

                <Button onClick={handleCloseModal}>닫기</Button>
            </ReactModal>
        </StyledEditDiv>
    );
};

export default EditMember;