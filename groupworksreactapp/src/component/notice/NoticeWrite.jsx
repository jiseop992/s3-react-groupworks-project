import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    background: white;
`;

const Label = styled.label`
    margin-bottom: 10px;
    color: #333;
    font-size: 1rem;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 1rem;
`;

const TextArea = styled.textarea`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 1rem;
    height: 100px;
    resize: vertical;
`;

const Select = styled.select`
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 1rem;
`;

const SubmitButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;



const NoticeWrite = () => {
    const loginMemberNo = sessionStorage.getItem("loginMemberNo");

    const navigate = useNavigate();
    const [loginMemberVo, setLoginMemberVo] = useState([]);
    //
    const [categories, setCategories] = useState([]); // 카테고리 데이터를 저장할 상태
    const [departments, setDepartments] = useState([]); // 부서 데이터를 저장할 상태
    // const [emergencies, setEmergencies] = useState();
    const [noticeData, setNoticeData] = useState({
        // memberNo: loginMemberNo,
        title: '',
        content: '',
        category: '',
        openDepart: '',
        // emergencyYn: '',
        file: null
        
    });

    // 카테고리와 부서 데이터를 로드하는 함수
    // const loadSelectOptions = async () => {
    //     try {
    //         const categoryResponse = await fetch('${process.env.REACT_APP_GROUPWORKS_API_URL}/app/notice/list/categoryList');
    //         const departmentResponse = await fetch('${process.env.REACT_APP_GROUPWORKS_API_URL}/app/notice/list/departList');
    //         if (!departmentResponse.ok) {
    //             throw new Error('데이터를 불러오는 데 실패했습니다.');
    //         }
    //         const categoryData = await categoryResponse.json();
    //         const departmentData = await departmentResponse.json();
    //         setCategories(categoryData);
    //         setDepartments(departmentData.list);
    //         console.log(categoryData);
    //         console.log(departmentData.list);
    //     } catch (error) {
    //         console.error('데이터 로딩 에러:', error);
    //     }
    // };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/notice/list/categoryList`)
        .then(resp => resp.json())
        .then(data => {
            if (data && data.categories) {
                setCategories(data.categories);
                setNoticeData(noticeData => ({ ...noticeData, category: data.categories[0].categoryNo }));
            }
        });
        // loadSelectOptions();

        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/notice/list/departList`)
        .then(resp => resp.json())
        .then(data => {
            if (data && data.list) {
                setDepartments(data.list);
                setNoticeData(noticeData => ({ ...noticeData, openDepart: data.list[0].no }));
            }
        });


        // fetch('${process.env.REACT_APP_GROUPWORKS_API_URL}/app/notice/list/emergencyYn')
        // .then( resp => resp.json())
        // .then( data => {
        //     console.log(data.list);
        //     setDepartments(data.list);
    }, []);
    //

    
    const handleInputChange = (e) => {
                // 숫자 타입의 필드 처리 (category, openDepart)
                const { name, value } = e.target;
                const updatedValue = (name === 'category' || name === 'openDepart') ? parseInt(value, 10) : value;
                setNoticeData({ ...noticeData, [name]: updatedValue });
    };

    //기존 파일 수정 코드
    const handleFileChange = (e) => {
        // 파일이 선택되었을 때 상태 업데이트
        if (e.target.files.length > 0) {
            setNoticeData({ ...noticeData, file: e.target.files[0] });
        }
    };

    //파일 수정 코드(지피티 / 비추천 방법)
    // const handleFileChange = (e) => {
    //     if (e.target.files.length > 0) {
    //         const file = e.target.files[0];
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => {
    //             setNoticeData({ ...noticeData, file: reader.result });
    //         };
    //         reader.onerror = (error) => {
    //             console.error('Error: ', error);
    //         };
    //     }
    // };

    const func = ( ) => {
        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/member/${loginMemberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            setLoginMemberVo(data.loginMemberVo);
        });
    }
    useEffect( () => {
        func();
    },[]);


    const handleSubmit = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('title', noticeData.title);
        formData.append('content', noticeData.content);
        formData.append('memberNo', loginMemberNo); // 로그인한 멤버 번호
        formData.append('category', noticeData.category); // 카테고리 번호
        formData.append('openDepart', noticeData.openDepart);
        if (noticeData.file) {
            formData.append('file', noticeData.file);
        }else {
            formData.append('file', null); // 파일이 없는 경우 NULL을 명시적으로 설정
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/notice/insert`, {
                method: 'POST',
                // headers: {
                //     "Content-type" : "application/json"
                // },
                // body: JSON.stringify(noticeData)
                body: formData
            });

            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }

            // 성공 시 다른 페이지로 이동 또는 알림 표시
            alert("공지사항 작성 완료!")
            navigate('/notice/list');
        } catch (error) {
            console.error('공지사항 작성 실패:', error);
        }
    };

    const categoryOptions = categories.map(category => (
        <option key={category.categoryNo} value={category.categoryNo}>
            {category.categoryCon}
        </option>
    ));

    const departmentOptions = departments.map(department => (
        <option key={department.no} value={department.no}>
            {department.name}
        </option>
    ));

    return (
        <Form onSubmit={handleSubmit}>
            <Label>
                제목:
                <Input
                    type="text"
                    name="title"
                    value={noticeData.title}
                    onChange={handleInputChange}
                />
            </Label>
            <Label>
                내용:
                <TextArea
                    name="content"
                    value={noticeData.content}
                    onChange={handleInputChange}
                />
            </Label>
            {/* <Label>
                작성자:{noticeData.memberNo}
                <Input
                    type="text"
                    name="memberNo"
                    value={noticeData.memberNo}
                    onChange={handleInputChange}
                    readOnly
                />
            </Label> */}
            <Label>이름 : {loginMemberVo.name}</Label>
            {/* <Label>
                카테고리:
                <Select
                    name="category"
                    value={noticeData.category}
                    onChange={handleInputChange}
                >
                    {categoryList}
                </Select>
            </Label> */}
            <Label>
                카테고리:
                <Select
                    name="category"
                    value={noticeData.category}
                    onChange={handleInputChange}
                >
                    {categoryOptions}
                </Select>
            </Label>
            <Label>
                공개 부서:
                <Select
                    name="openDepart"
                    value={noticeData.openDepart}
                    onChange={handleInputChange}
                >
                    {departmentOptions}
                </Select>
            </Label>
            <Label>
                파일첨부:
                <Input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                />
            </Label>
            {/* <Label>
                긴급 여부:
                <Select
                name='emergencyYn'
                value={noticeData.emergencyYn}
                onChange={handleInputChange}
                >
                    {emergencyYn}
                </Select>
            </Label> */}
            {/* 기타 필드 */}
            <SubmitButton type="submit">저장</SubmitButton>
        </Form>
    );
};

export default NoticeWrite;