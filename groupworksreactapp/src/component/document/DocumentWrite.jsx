import React from 'react';
import styled from 'styled-components';
import VacationFormWrite from './VacationFormWrite';
import BusinessFormWrite from './BusinessFormWrite';


const StyledDocumentWriteDiv = styled.div`
    width: 80%;
    height: 80%;
`;

const DocumentWrite = () => {
    return (
        <StyledDocumentWriteDiv>
            <VacationFormWrite />
        </StyledDocumentWriteDiv>
            
    );
};

export default DocumentWrite;