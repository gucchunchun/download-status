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
    type?: string;
    options?: string[];
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
//label 
interface LabelDivProps {
    width?: string;
    inLine?: boolean;
}
const LabelDiv = styled('div')<LabelDivProps>`
    width: ${props=>props.width||'fit-content'};
    ${props=>props.inLine!==true&&'margin-right: auto;'}
    ${props=>props.width&&'flex-shrink: 0;'}
`;
interface LabelProps{
    fontSize?: string;
    fontWeight?: string;
    fontColor?: string;
}
const Label = styled('label')<LabelProps>`
    font-size: ${props=>props.fontSize||'1rem'};
    font-weight: ${props=>props.fontWeight||'normal'};
    color: ${props=>props.color||`rgb(${theme.colors.textPrimary})`};
    white-space: nowrap;
`;
const LabelP = styled('p')<LabelProps>`
    font-size: ${props=>props.fontSize||'1rem'};
    font-weight: ${props=>props.fontWeight||'normal'};
    color: ${props=>props.color||`rgb(${theme.colors.textPrimary})`};
    white-space: nowrap;
`;

//content
interface ContentDivProps{
    fontSize?: string;
}
const ContentDiv = styled('div')<ContentDivProps>`
    width: auto;
    flex-grow: 1;
    font-size: ${props=>props.fontSize||'1rem'};
    display: flex;
    flex-wrap: wrap;
`;
interface ContentProps{
    fontSize?: string;
    fontWeight?: string;
    fontColor?: string;
    value: string;
}
const ContentP = styled('p')<ContentProps>`
    width: 100%;
    white-space: nowrap;
    font-size: ${props=>props.fontSize||'1rem'};
    font-weight: ${props=>props.fontWeight||'normal'};
    color: ${props=>props.value===''?`rgb(${theme.colors.reject})`:props.color||`rgb(${theme.colors.textPrimary})`};
    text-align: center;
`;
const ContentInput = styled('input')<ContentProps>`
    width: 100%;
    border: 1px solid rgb(${theme.colors.border});
    font-size: 80%;
    font-weight: ${props=>props.fontWeight||'normal'};
    color: ${props=>props.color||`rgb(${theme.colors.textPrimary})`};
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
        {props.label?
            props.type === 'radio'?
            (<LabelDiv 
                width={props.labelWidth}
                inLine={props.labelInline}>
                    <LabelP 
                        fontSize={props.labelFontSize}
                        fontColor={props.fontColor}
                        fontWeight={props.labelFontWeight}>
                            {props.label}
                    </LabelP>
            </LabelDiv>)
            :
            (<LabelDiv 
                width={props.labelWidth}
                inLine={props.labelInline}>
                    <Label 
                        htmlFor={props.label}
                        fontSize={props.labelFontSize}
                        fontColor={props.fontColor}
                        fontWeight={props.labelFontWeight}>
                            {props.label}
                    </Label>
            </LabelDiv>):null}
        {props.type === 'radio' && props.options ? 
            (<ContentDiv fontSize={props.fontSize}>
                {props.options.map((option, index) => (
                    <ContentDiv key={index}>
                        <ContentInput
                            id={`${props.label}_${index}`}
                            type="radio"
                            value={option}
                            checked={value === option}
                            onChange={handleOnChange}
                            fontWeight={props.fontWeight}
                            fontColor={props.fontColor}
                        />
                        <LabelDiv 
                            inLine={props.labelInline}>
                            <Label 
                                htmlFor={`${props.label}_${index}`}
                                fontSize={props.fontSize}
                                fontColor={props.fontColor}
                                fontWeight={props.fontWeight}>
                                {option}
                            </Label>
                        </LabelDiv>
                    </ContentDiv>
                ))}
            </ContentDiv>
            )
            : 
            (<ContentDiv fontSize={props.fontSize}>
                    <ContentInput
                        id={props.label}
                        type={props.type || 'text'}
                        value={value}
                        onChange={handleOnChange}
                        fontWeight={props.fontWeight}
                        fontColor={props.fontColor}
                    />
            </ContentDiv>
            )
        }
      </ContainerDiv>
    );
  } else {
    return (
        <ContainerDiv
            id={props.label}
            width={props.width}
            height={props.height}
            inLine={props.labelInline}>
            {props.label?
                <LabelDiv 
                    width={props.labelWidth}
                    inLine={props.labelInline}>
                        <LabelP
                            fontSize={props.labelFontSize}
                            fontWeight={props.labelFontWeight}
                            fontColor={props.LabelFontColor}>
                                {props.label}
                        </LabelP>
                </LabelDiv>
            :null}
            <ContentDiv>
                <ContentP
                    fontSize={props.fontSize}
                    fontWeight={props.fontWeight}
                    fontColor={props.fontColor}
                    value={value}
                    >
                    {value===''?'(undefined)':value}
                </ContentP>
            </ContentDiv>
        </ContainerDiv>
    )
  }
}

export default EditableContent;

