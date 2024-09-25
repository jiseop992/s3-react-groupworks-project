import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledBusinessTripFormDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

* {font-family: 'InfinitySans-RegularA1'; }
    section > .EPay-index_section {
  margin-left: 70px;
  border: 1px solid transparent;
  width: 200px;
  float: left;
  font-size: 20px;
  position: fixed;
  height: 100%;
  background: white;
  border-right: 2.5px solid rgb(88, 107, 141);
}

.EPay-index_section li {
  cursor: pointer;
  padding-left: 20px;
  padding-top: 20px;
}

.EPay-index_section li>ul {
  position: absolute;
  width: 200px;
  padding: 0;
  display: none;
  margin: 0;
}

.EPay-index_section li>div {
  display: none;
  font-size: 15px;
}

/* section2 부분*/

section > .index_section2 h2{
  margin-left: 450px;
  font-size: 35px;
  font-weight: 900;
  line-height: 100px;
  margin-top: 0; 
}

#e-pay-status{
  padding-left: 450px;
}

#e-pay-status span {
  border: 1px solid lightgrey;
  display: inline-block;
  text-align: center;
  width: 447px;
  height: 300px;
  font-size: 40px;
  border-radius: 8px;
  color: rgb(59, 211, 39);
}

#e-pay-status span>div{
  color: black;
  padding-top: 70px;
  font-size: 70px;
}

section > .index_section2 table{
  margin-left: 450px;
  line-height: 40px;
  width: 1350px;
  text-align: center;
  border: 1px solid black;
  border-radius: 8px;
}

#e-pay-list th{
  border-bottom: 1px solid black;
}

#e-pay-list td{
  border-bottom: 1px solid lightgrey;
  border-right: 1px dotted lightgrey;
  border-radius: 5px;
}

.index_section2-form1{
  padding-top: 70px;
}

.index_section2-form1 h2{
  font-size: 50px;
  margin-bottom: 10;
  text-align: center;
  margin: 0px 160px 0px 0px;
}
#table1{
  padding-left: 1250px;
  padding-bottom: 40px; 
}
#table1 th{
  background: lightgrey;
}
#table2{
  text-align: center;
  width: 1020px;
  margin-left: 500px;
}
#table2 td{
  border: 1px solid;
}
#table2 input{
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  border: none;
}
#table2 button{
  border-radius: 30px;
  font-size: 20px;
  background: none;
}
#table2 textarea{
  border: none;
}
.index_section2-form1 #table1 td{
  text-align: center;
  height: 50px;
}
	table input{
        font-size: 30px;
        width: 100%;
        height: 100%; 
        border: none; 
        text-align: center;
    }
    #button{
        text-align: center;
        padding-left: 210px;
        margin-bottom: 40px;
    }
    button {
        border-radius: 8px;
        background: none;
        font-size: 30px;
        cursor: pointer;
    }
    table {
        text-align: center;
        font-weight: bold;
        border-collapse: collapse;
    }
   .form-radio{
       display: inline-block; 
       line-height: 20px; 
       vertical-align: middle;
       font-size: 14px; 
   }
   .form-chek::before, .form-radio::before{
       content: ""; 
       display: inline-block; 
       width: 10px; 
       height: 10px; 
       background: #ffffff; 
       border: 1px solid #3d3d3e; 
       margin-right: 8px;
   }
   
table, th, td {
  border: 1.5px solid black; /* 검은색 테두리 적용 */
}

th, td {
  padding: 8px; /* 셀 안에 내용에 대한 패딩 추가 */ 
}
   .form-radio::before{ border-radius: 50%; }
   .input-chek, .input-radio{ display: none; }
   .input-chek:checked + .form-chek::before, .input-radio:checked + .form-radio::before{ background: #5b18ff; }
   .input-chek:checked + .form-chek, .input-radio:checked + .form-radio{ color: #5b18ff; }
   .leaveDetailTextArea { font-size: 25px; }
`;

Modal.setAppElement('#root');

const BusinessTripFormWrite = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyMember, setCompanyMember] = useState([]);
  const [currentApplyType, setCurrentApplyType] = useState('');
  const [content, setContent] = useState('');
  const [sign, setSign] = useState('');
  const [loginMember, setLoginMember] = useState([]);
  const [vacationDate, setVacationDate] = useState({
    startTime: '',
    finishTime: ''
  });
  const [selectApply, setSelectApply] = useState({
    firstApply: {name:'', no:''},
    midApply: {name:'', no:''},
    lastApply: {name:'', no:''},
  });

  const fetchCompanyMember = () => {
    fetch(`${process.env.GROUPWORKS_API_URL}/app/api/business-trip-form/member?companyNo=${loginMember.companyNo}`, {
      method: 'GET',
      headers : {
        'Content-Type' : 'application/json'
      },
    })
    .then( resp => resp.json() )
    .then( data => {
      console.log(data);
      if(data.msg === 'good' && data.memberList){
        setCompanyMember(data.memberList);
      }
    } );
  };

  const handleOpenModal = (applyType) => {
    setIsModalOpen(true);
    setCurrentApplyType(applyType);
    fetchCompanyMember();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectMember = (member, event) => {
    console.log(member);
    event.stopPropagation();
    setSelectApply(prev => ({
      ...prev,
      [currentApplyType]: { name: member.name, no: member.no}
    }));
    handleCloseModal();
  };
  useEffect(() => {
    console.log(selectApply); // 상태 업데이트 확인
  }, [selectApply]);

  const loginMemberNo = sessionStorage.getItem("loginMemberNo");
  const queryParam = encodeURIComponent(loginMemberNo);

  const url = `${process.env.GROUPWORKS_API_URL}/app/api/business-trip-form/login-member?no=${queryParam}`;
  const fetchLoginMember = () => {
    fetch(url)
    .then( (resp) => resp.json() )
    .then( data => {
        if(data.msg === 'good' && data.loginMember){
          setLoginMember(data.loginMember);
        }
    } );
  };
  
  useEffect(() => {
    fetchLoginMember();
  }, [loginMemberNo]);


  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setVacationDate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSignChange = (event) => {
    setSign(event.target.value);
  };

  const findNoByName = (name, companyMember) => {
    const member = companyMember.find(member => member.name === name);
    return member ? member.no : null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      firstApplyNo: selectApply.firstApply.no,
      midApplyNo: selectApply.midApply.no,
      lastApplyNo: selectApply.lastApply.no,
      writerNo: loginMemberNo, 
      ...vacationDate,
      content,
      sign
    };
    console.log('formData:', formData);
    fetch(`${process.env.GROUPWORKS_API_URL}/app/api/business-trip-form/write` , {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then( resp => resp.json() )
    .then( data => {
      if(data.msg === 'good'){
        alert("결재 등록 완료");
        navigate('/document/list')
      } else {
        alert("결재 등록 실패")
      }
    } )
    .catch( error => {
      console.error('Error', error);
      alert('오류가 발생했습니다. 다시시도해주세요')
      console.log(formData);
    })
  };

    return (
        <StyledBusinessTripFormDiv>
            <form name="leaveWriteForm" onSubmit={handleSubmit}> 
                <div className="cash-form-section">
                    <div className="cash-disbursement">
                        <table border="2">
                            <tbody>
                                <tr>
                                    <td rowSpan="2" colSpan="4" style={{ width: '300px', height: '100px', fontSize: '35px', fontWeight: 600 }}>
                                        출 장 신 청 서
                                    </td>
                                    
                                    <td rowSpan="2" style={{ width: '15px', paddingTop: '20px', fontSize: '20px' }}>
                                        결 재
                                    </td>
                                    <td style={{ height: '30px', width: '100px' }}>
                                        최초승인자
                                    </td>
                                    <td style={{ width: '100px' }}>
                                        중간승인자
                                    </td>
                                    <td style={{ width: '100px' }}>
                                        최종승인자
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="text" value={selectApply.firstApply.name} readOnly />
                                        <button type="button" onClick={() => handleOpenModal('firstApply')}>검색</button>
                                    </td>
                                    <td>
                                        <input type="text" value={selectApply.midApply.name} readOnly />
                                        <button type="button" onClick={() => handleOpenModal('midApply')}>검색</button>
                                    </td>
                                    <td>
                                        <input type="text" value={selectApply.lastApply.name} readOnly />
                                        <button type="button" onClick={() => handleOpenModal('lastApply')}>검색</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ height: '70px', width: '80px' }}>
                                        성 명 
                                    </td>
                                    <td><input type="text" value={loginMember.name || ''} readOnly /></td>
                                    <td style={{ width: '80px' }}>
                                        부 서
                                    </td>
                                    <td><input type="text"value={loginMember.departName || ''} readOnly /></td>
                                    <td style={{ width: '80px' }}>
                                        직 급
                                    </td>
                                    <td colSpan="3"><input type="text" value={loginMember.positionName || ''} readOnly /></td>
                                </tr>
                                <tr>
                                    <td colSpan="3" style={{ height: '70px', width: '80px' }}>
                                        기 간
                                    </td>
                                    <td colSpan="5">
                                        <span>
                                            <input style={{ width: '160px', fontSize: '18px' }} type="date" name="startTime" value={vacationDate.startTime} onChange={handleDateChange}/>
                                        </span>
                                        &nbsp;&nbsp; ~ &nbsp;&nbsp;
                                        <span>
                                            <input style={{ width: '160px', fontSize: '18px' }} type="date" name="finishTime" value={vacationDate.finishTime} onChange={handleDateChange} />
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '80px' }}>
                                        세부사항
                                    </td>
                                    <td colSpan="8">
                                        <input style={{ height: '300px' }} type="text" value={content} onChange={handleContentChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', height: '100px', borderBottom: 'none' }}>
                                        위와 같이 휴가를 신청하오니 허락하여 주시기 바랍니다.
                                    </td>
                                </tr>
                                <tr style={{ border: 'white' }}>
                                    <td colSpan="8" style={{ textAlign: 'center', height: '100px' }}>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'right', height: '100px', paddingRight: '50px' }}>
                                        <input type="button" style={{ fontSize: '15px', width: '70px', height: '30px', border: 'none', textAlign: 'center', borderRadius: '20px', marginRight: '10px' }} value="서명" />
                                        신청자 :
                                        <textarea style={{ width: '130px', border: 'none', textAlign: 'center', resize: 'none', fontSize: '24px', marginBottom: '-42px' }} value={sign} onChange={handleSignChange}/>
                                        (인)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="button">
                        <input type="hidden" value="휴가신청서" />
                        <input type="text" style={{ border: 'none', width: '40px' }} disabled />
                        <button type="submit">등록</button>
                    </div>
                </div>
            </form>
            <Modal
              isOpen={isModalOpen}
              onRequestCode={handleCloseModal}
              contentLabel="승인자 리스트"
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.75)' // 모달의 배경색을 어둡게 설정
                },
                content: {
                  top: '50%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                  width: '600px', // 모달의 너비를 600px로 설정
                  height: '400px' // 모달의 높이를 400px로 설정
                }
              }}
            >
              <h2>승인자 리스트</h2>
              <ul>
                {companyMember.map(member => (
                  <li key={member.no} onClick={(event) => handleSelectMember(member, event)}>
                    {member.name}
                  </li>
                ))}
              </ul>
              <button onClick={handleCloseModal}>닫기</button>
            </Modal>
        </StyledBusinessTripFormDiv>
    );
};

export default BusinessTripFormWrite;
