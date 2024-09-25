import React, { useState } from 'react';
import styled from 'styled-components';
import PayFormList from './PayFormList';
import VacationFormList from './VacationFormList';
import BusinessFormList from './BusinessFormList';


const StyledDocumentListDiv = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center; 
  align-items: center; 
  flex-direction: column; 

  button {
    padding: 15px 30px; 
    margin: 10px; 
    font-size: 1rem; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer; 
    transition: background-color 0.2s ease-in-out;
    font-weight: bold;
    &:hover {
      opacity: 0.9; 
    }
    &.vacation {
      background-color: #28a745; 
      color: white;
    }
    &.business {
      background-color: #007bff; 
      color: white;
    }
  }
`;

const DocumentList = () => {

    const [formType, setFormType] = useState('');

    const handleClick = (type) => {
        setFormType(type);
    };

    return (
       <StyledDocumentListDiv>
            <button className="vacation"  onClick={ () => handleClick('vacationForm')}>휴가신청서 조회/등록</button>
            <button className="business" onClick={() => handleClick('businessForm')}>출장신청서 조회/등록</button>
            {formType === 'vacationForm' && <VacationFormList />}
            {formType === 'businessForm' && <BusinessFormList />}
       </StyledDocumentListDiv>
    );  
};

export default DocumentList;