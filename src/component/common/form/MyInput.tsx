import React, { ChangeEventHandler }  from 'react';
import styled from '@emotion/styled';
import theme from '../../../styles/theme';

interface MyInputProps {
    id: string
    name: string
    value: string
    type: string
    placeholder?: string
    label?: string
    width?: string;
    height?: string;
    inputWidth?: string;
    inputHeight?: string;
    inputTextSize?: string;
    labelTextSize?: string;
    onChange?: ChangeEventHandler;
}

interface StyledDivProps {
    width?:string;
    height?:string;
}

const StyledDiv = styled('div')<StyledDivProps>`
    width: ${props=>props.width || '100%'};
    height: ${props=>props.height || 'fit-contents'};
`;
interface StyledLabelProps {
    textSize?:string;
}
const StyledLabel = styled('label')<StyledLabelProps>`
    color: ${theme.colors.textPrimary};
    font-size: ${props=>props.textSize || '1rem'};
`;
interface StyledInputProps {
    width?: string
    height?: string
    textSize?: string
}
const StyledInput = styled('input')<StyledInputProps>`
    width: ${props=>props.width || '100%'};
    height: ${props=>props.height || '1rem'};
    color: ${theme.colors.textPrimary};
    font-size: ${props=>props.textSize || '1rem'};
    border: 1px solid rgb(${theme.colors.border});
`;
const MyInput:React.FC<MyInputProps> = (props) => {
    return(
        <StyledDiv>
            {props.label?<StyledLabel htmlFor={props.id} textSize={props.labelTextSize}>{props.label}</StyledLabel>:null}
            <StyledInput
                id={props.id}
                name={props.name}
                value={props.value}
                type={props.type}
                placeholder={props.placeholder||''}
                width={props.inputWidth}
                height={props.inputHeight}
                textSize={props.inputTextSize}
                onChange={props.onChange}/>
        </StyledDiv>
    );
};

export default MyInput;