import React, { useRef } from 'react';
import styled from '@emotion/styled';
import theme from '../../../styles/theme';

interface FileDivProps {
    isLast: boolean;
    children: React.ReactNode;
}

interface FileDivProps {
    isLast: boolean;
};
const Div = styled('div')<FileDivProps>`
    width: 100%;
    height: 3.5rem;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: ${props=>props.isLast===true? 'none': '1px solid rgb(' + theme.colors.border + ')'};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const FileDiv:React.FC<FileDivProps> = (props) => {
    
    return(
        <Div isLast={props.isLast} >
            {props.children}
        </Div>
    )
};

export default FileDiv;