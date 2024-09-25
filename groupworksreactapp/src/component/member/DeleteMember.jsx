import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import styled from 'styled-components';

const StyledDeleteDiv = styled.div`
    margin-top: 10vh;
    & > table {
        width: 70vw;
    }
`;
const DeleteMember = () => {
    const [memberList, setMemberList] = useState([]);
    const [authList, setAuthList] = useState([]);
    const [departList, setDepartList] = useState([]);
    const [positionList, setPositionList] = useState([]);

    const [userAuth, setUserAuth] = useState([]);
    const [userDepart, setUserDepart] = useState([]);
    const [userPosition , setUserPosition] = useState([]);

    const [memberVo, setMemberVo] = useState({
        no : "",
        authNo : "",
        departNo : "",
        positionNo : ""
    })

    const loginMemberNo = sessionStorage.getItem("loginMemberNo");

    useEffect( () => {
        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/member/list/auth`)
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'okay') {
                setAuthList(data.authList);
            }
            else {
                alert("사원 목록 로드 실패");
            }
        });

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

        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/member/list/${loginMemberNo}`)
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === 'okay') {
                setMemberList(data.list);
            }
            else {
                alert("사원 목록 로드 실패");
            }
        })
    }, []);

    const handleDeleteBtn = ( prop ) => {
        console.log(prop);
        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/member/${prop}`,{
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.msg === 'okay'){
                alert("구성원 삭제 완료!");
                window.location.reload();
            }else {
                alert("구성원 삭제 실패 재시도 바랍니다.");
                window.location.reload();
            }
        })
    };

    const handleAuthInputChange = ( event, memberNo ) => {
        const selectedAuthValue = event.target.value;
        setUserAuth({
            ...userAuth ,
            [memberNo] : selectedAuthValue
        });
        setMemberVo({
            ...memberVo ,
            "no" : memberNo,
            "authNo" : selectedAuthValue
        });
    };

    const handleDepartInputChange = ( event, memberNo ) => {
        const selectedDepartValue = event.target.value;
        setUserDepart({
            ...userDepart ,
            [memberNo] : selectedDepartValue
        });
        setMemberVo({
            ...memberVo ,
            "no" : memberNo,
            "departNo" : selectedDepartValue
        });
    };

    const handlePositionInputChange = ( event, memberNo ) => {
        const selectedPositionValue = event.target.value;
        setUserPosition({
            ...userPosition ,
            [memberNo] : selectedPositionValue
        });
        setMemberVo({
            ...memberVo ,
            "no" : memberNo,
            "positionNo" : selectedPositionValue
        });
    };

    const handleMemberChange = () => {
        fetch(`${process.env.REACT_APP_GROUPWORKS_API_URL}/app/api/member`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(memberVo)
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.msg === "okay"){
                alert("권한 수정 완료!");
                window.location.reload();
            }else {
                alert("권한 수정 실패 재시도 바람");
            }
        })
    };

    const ListAuthBox = ( props ) => {
        return (
            <>
            <td>
                <Form.Select 
                    value={userAuth[props.no] ? userAuth[props.no] : ''}
                    onChange={(event) => handleAuthInputChange(event, props.no)}
                >
                    <option value=''>권한</option>
                    {
                        authList.map ( (auth) => {
                            return <option key={auth.name} value={auth.no}>{auth.name}</option>;
                        } )
                    }
                </Form.Select>
            </td>
            <td>
                <Button variant='warning' onClick={() => handleMemberChange(props.no)}>변경</Button>
            </td>
            </>
        );
    };    

    const ListDepartBox = ( props ) => {
        return (
            <>
            <td>
                <Form.Select
                    value={userDepart[props.no] ? userDepart[props.no] : ''}
                    onChange={(event) => handleDepartInputChange(event, props.no)}
                >
                    <option value=''>부서</option>
                    {
                        departList.map ( (depart) => {
                            return <option key={depart.name} value={depart.no}>{depart.name}</option>;
                        } )
                    }
                </Form.Select>
            </td>
            <td>
                <Button variant='warning' onClick={() => handleMemberChange(props.no)}>변경</Button>
            </td>
            </>
        );
    };

    const ListPositionBox = ( props ) => {
        return (
            <>
            <td>
                <Form.Select
                    value={userPosition[props.no] ? userPosition[props.no] : ''}
                    onChange={(event) => handlePositionInputChange(event, props.no)}
                >
                    <option value=''>직책</option>
                    {
                        positionList.map ( (position) => {
                            return <option key={position.name} value={position.no}>{position.name}</option>;
                        } )
                    }
                </Form.Select>
            </td>
            <td>
                <Button variant='warning' onClick={() => handleMemberChange(props.no)}>변경</Button>
            </td>
            </>
        );
    };


    const ListMemberTd = () => {
        return (
          <tbody>
            {memberList.map((member) => {
              return (
                <tr key={member.no}>
                  <td>{member.name}</td>
                  <td>{member.tel}</td>
                  <td>{member.departName}</td>
                  <ListDepartBox no={member.no}/>
                  <td>{member.positionName}</td>
                  <ListPositionBox no={member.no}/>
                  <ListAuthBox no={member.no}/>
                  <td><Button variant='danger' onClick={() => handleDeleteBtn(member.no)}>삭제</Button></td>
                </tr>
              );
            })}
          </tbody>
        );
    };
      
    return (
        <StyledDeleteDiv>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>연락처</th>
                        <th>부서</th>
                        <th colSpan={2}>부서 변경</th>
                        <th>직책</th>
                        <th colSpan={2}>직책 변경</th>
                        <th colSpan={2}>권한 변경</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <ListMemberTd />
            </Table>
        </StyledDeleteDiv>
    );
};

export default DeleteMember;