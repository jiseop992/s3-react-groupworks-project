import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledOrganEditDiv = styled.div`
    /* width: 100%;
    height: 100%;
    padding: 20px; */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    z-index: 1000;
    border-radius: 10px; // 모달에 둥근 모서리 추가
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); // 그림자 효과 추가
    max-width: 500px; // 모달의 최대 너비 설정
`;


const OrganEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [editedOrgan, setEditedOrgan] = useState(location.state?.selectedVo || {
        name: '',
        departNo: '',
        positionNo: '',
        tel: '',
        email: '',
        // ... 기타 필요한 필드 ...
    });

    const handleChange = (e) => {
        setEditedOrgan({ ...editedOrgan, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('orgNo', editedOrgan.orgNo);
        formData.append('memberNo', editedOrgan.memberNo);
        formData.append('name', editedOrgan.name);
        formData.append('id', editedOrgan.id);
        formData.append('email', editedOrgan.email);
        formData.append('tel', editedOrgan.tel);
        formData.append('address', editedOrgan.address);
        formData.append('departNo', editedOrgan.departNo);
        formData.append('companyNo', editedOrgan.companyNo);
        formData.append('positionNo', editedOrgan.positionNo);
        // 파일이 첨부되었는지 확인하고 추가
        if (editedOrgan.profile) {
            formData.append('file', editedOrgan.profile);
        }


        // 수정된 조직도 데이터를 서버로 전송합니다.
        fetch(`${process.env.GROUPWORKS_API_URL}/app/organ/edit`, {
            method: 'POST',
            body: formData // JSON.stringify를 사용하지 않고, FormData를 직접 전달
            })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }
            return response.json();
        })
        .then(data => {
            alert("조직도 수정 성공")
            navigate('/organ/list');
        })
        .catch(error => {
            console.error('수정 실패:', error);
            alert("조직도 수정 실패")
        });
    };


        // 파일 첨부 처리
        const handleFileChange = (e) => {
            setEditedOrgan({ ...editedOrgan, file: e.target.files[0] });
        };

        
    return (
        <StyledOrganEditDiv>
            <h2>조직도 수정</h2>
            <form onSubmit={handleSubmit}>
                <label>이름: {editedOrgan.name}
                    {/* <input
                        type="text"
                        name="name"
                        value={editedOrgan.name}
                        onChange={handleChange}
                    /> */}
                </label>
                <br />
                <label>부서:
                    <input
                        type="text"
                        name="departNo"
                        value={editedOrgan.departNo}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>직책:
                    <input
                        type="text"
                        name="positionNo"
                        value={editedOrgan.positionNo}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>번호:
                    <input
                        type="text"
                        name="tel"
                        value={editedOrgan.tel}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>이메일:
                    <input
                        type="text"
                        name="email"
                        value={editedOrgan.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    프로필:
                    <input
                        type="file"
                        name="profile"
                        onChange={handleFileChange}
                    />
                </label>
                <button type="submit">저장</button>
                </form>
            </StyledOrganEditDiv>
    )
}

export default OrganEdit;