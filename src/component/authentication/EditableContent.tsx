import React, { useState } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';

interface EditableContentProps {
    editMode: boolean
    initialContent: string
    width?: string;
    height?: string;
    fontSize?: string;
    fontWeight?: string;
    fontColor?: string;
    onChange?: React.ChangeEventHandler
}

interface StyledDivProps{
    width?: string;
    height?: string;
    fontSize?: string;
    fontWeight?: string;
    fontColor?: string;

}
const StyledDiv = styled('div')<StyledDivProps>`
    width: ${props=>props.width||'100%'};
    height: ${props=>props.width||'fit-content'};
    font-size: ${props=>props.fontSize||'1rem'};
    font-weight: ${props=>props.fontWeight||'normal'};
    color: ${props=>props.color||theme.colors.textPrimary};
    text-align: center;
`;

interface StyledInputProps{
    fontWeight?: string;
    fontColor?: string;

}
const StyledInput = styled('input')<StyledInputProps>`
    width: 100%;
    height: 100%;
    border: 1px solid rgb(${theme.colors.border});
    font-size: 80%;
    font-weight: ${props=>props.fontWeight||'normal'};
    color: ${props=>props.color||theme.colors.textPrimary};
`;
const EditableContent:React.FC<EditableContentProps> = (props) => {
    const [value, setValue] = useState(props.initialContent);

    function handleOnChange(event:React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        setValue(event.target.value);
        if(props.onChange){
            props.onChange(event);
        }
    }
  if (props.editMode) {
    return (
      <StyledDiv
        width={props.width}
        height={props.height}
        fontSize={props.fontSize}
        fontWeight={props.fontWeight}
        fontColor={props.fontColor}>
        <StyledInput type="text" value={value} onChange={handleOnChange} />
      </StyledDiv>
    );
  } else {
    return <StyledDiv
            width={props.width}
            height={props.height}
            fontSize={props.fontSize}
            fontWeight={props.fontWeight}
            fontColor={props.fontColor}>
            {props.initialContent}
            </StyledDiv>;
  }
}

export default EditableContent;

