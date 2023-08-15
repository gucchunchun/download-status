import React, { useState, useEffect } from 'react';
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
    label?: string;
    labelInline?: boolean;
    labelWidth?: string;
    labelFontSize?: string;
    labelFontWeight?: string;
    LabelFontColor?: string;
    onChange?: React.ChangeEventHandler
}

interface ContainerDivProps{
    width?: string;
    height?: string;
    inLine?: boolean;
}
const ContainerDiv = styled('div')<ContainerDivProps>`
    width: ${props=>props.width||'100%'};
    height: ${props=>props.width||'fit-content'};
    display:${props=>props.inLine?'flex': 'block'};
    align-items: end;
`;
interface StyledLabelProps {
    width?: string;
    fontSize?: string;
    fontWeight?: string;
    fontColor?: string;
    inLine?: boolean;
}
const LabelDiv = styled('div')<StyledLabelProps>`
    width: ${props=>props.width||'fit-content'};
    font-size: ${props=>props.fontSize||'1rem'};
    font-weight: ${props=>props.fontWeight||'normal'};
    color: ${props=>props.color||theme.colors.textPrimary};
    ${props=>props.inLine!==true&&'margin-right: auto;'}
`;
interface ValueDivProps{
    fontSize?: string;
}
const ValueDiv = styled('div')<ValueDivProps>`
    width: auto;
    flex-grow: 1;
    font-size: ${props=>props.fontSize||'1rem'};
`;
interface StyledPProps{
    fontSize?: string;
    fontWeight?: string;
    fontColor?: string;
    inLine?: boolean;
}
const StyledP = styled('p')<StyledPProps>`
    width: 100%;
    height: 100%;
    font-size: ${props=>props.fontSize||'1rem'};
    font-weight: ${props=>props.fontWeight||'normal'};
    color: ${props=>props.color||theme.colors.textPrimary};
    text-align: center;
`;

interface StyledInputProps{
    fontWeight?: string;
    fontColor?: string;
    inLine?: boolean;
}
const StyledInput = styled('input')<StyledInputProps>`
    border: 1px solid rgb(${theme.colors.border});
    font-size: 80%;
    font-weight: ${props=>props.fontWeight||'normal'};
    color: ${props=>props.color||theme.colors.textPrimary};
    width:100%;
`;
const EditableContent:React.FC<EditableContentProps> = (props) => {
    const [value, setValue] = useState(props.initialContent);
    useEffect(()=>{
        if(props.onChange) {
            setValue(props.initialContent);
        }
    },[props])

    function handleOnChange(event:React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        
        if(props.onChange){
            //parents control value
            props.onChange(event);
        }else{
            //control by itself
            setValue(event.target.value);
        }
    }
  if (props.editMode) {
    return (
      <ContainerDiv
        width={props.width}
        height={props.height}
        inLine={props.labelInline}>
        {props.label?<LabelDiv 
                        width={props.labelWidth}
                        fontSize={props.labelFontSize}
                        fontColor={props.fontColor}
                        fontWeight={props.labelFontWeight}
                        inLine={props.labelInline}>
                            <label htmlFor={props.label}>{props.label}</label>
                        </LabelDiv>:null}
            <ValueDiv fontSize={props.fontSize}>
                <StyledInput 
                    id={props.label} 
                    type='text' 
                    value={value} 
                    onChange={handleOnChange}
                    fontWeight={props.fontWeight}
                    fontColor={props.fontColor}
                    inLine={props.labelInline}>
                </StyledInput>
            </ValueDiv>
            
      </ContainerDiv>
    );
  } else {
    return (
        <>
            <ContainerDiv
            id={props.label}
            width={props.width}
            height={props.height}
            inLine={props.labelInline}>
                {props.label?<LabelDiv 
                                width={props.labelWidth}
                                fontSize={props.labelFontSize}
                                fontColor={props.fontColor}
                                fontWeight={props.labelFontWeight}
                                inLine={props.labelInline}>
                                    <label htmlFor={props.label}>{props.label}</label>
                                </LabelDiv>:null}
                <ValueDiv>
                    <StyledP
                        fontSize={props.fontSize}
                        fontWeight={props.fontWeight}
                        fontColor={props.fontColor}
                        >
                        {props.initialContent}
                    </StyledP>
                </ValueDiv>
            </ContainerDiv>
        </>
    )
  }
}

export default EditableContent;

