import React, { useState } from 'react';
import styled from '@emotion/styled';

interface GradientButtonProps {
    text: string;
    isDisabled: boolean;
    disabledText?: string;
    type?: "button" | "submit" | "reset" ;
    width?: string;
    padding?: string;
    textColor?: string;
    hoveredTextColor?: string;
    border?: string;
    bgColor?: string;
    hoveredBgColor?: string;
    onClick?: any;
}

interface StyledButtonProps {
    text: string; 
    isDisabled: boolean;
    width?: string;
    padding?: string;
    border?: string;
    backgroundColor?: string;
}
const StyledButton = styled('button')<StyledButtonProps>`
    position: relative;
    overflow: hidden;
    width: ${props=> props.width || props.text.length + 'rem'};
    height: 1rem;
    padding: ${props=>props.padding || '0.5em'};
    box-sizing: content-box;
    border: ${props=>props.border || '1px solid #000'};
    border-radius: 0.5rem;
    background-color: ${props=>props.backgroundColor || '#FFFFFF'};
    opacity: ${props=>props.isDisabled? '0.3': '1'};
`;
interface StyledTextProps {
    color?: string;
    hoveredColor?: string;
    isHovered: boolean;
}
const StyledText = styled('p')<StyledTextProps>`
    z-index: 2;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    font-weight: bold;
    font-size: 1rem;
    color: ${props=>props.isHovered? props.hoveredColor || '#FFFFFF': props.color || '#000'};
    background-color: transparent;
`;
interface StyledSpanProps {
    text: string;
    bgColor?: string;
    isHovered: boolean;
}
const StyledSpan = styled('span')<StyledSpanProps>`
    z-index: 1;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: ${props=>props.isHovered? ((props.text.length)*2) + 'rem': '0px'};
    aspect-ratio: 1/1;
    border-radius: 50%;
    background-color: ${props=>props.bgColor || '#000'};
    transition: 0.5s ease all;
`;
/**
 * 
 * @param {string} props.text -text to display on button
 * @param {boolean} props.isDisabled - if the button is disabled
 * @param {string} props.disabledText -text to display on button when the button is disabled
 * @param {("button" | "submit" | "reset")} props.type - button type
 * @param {string} props.width -button width. it would be text.length*1rem if it is not defined
 * @param {string} props.padding -button padding. it would be 0.5rem if it is not defined
 * @param {string} props.textColor - text's color. it would be black(#000) if it is not defined
 * @param {string} props.hoveredTextColor - text's color when the button is hovered. it would be white(#FFFFFF) if it is not defined
 * @param {string} props.border - it would be '1px solid #000' if it is not defined
 * @param {string} props.bgColor - background color of the button. it would be white(#FFFFFF) if it is not defined
 * @param {string} props.hoveredBgColor - background color of the button when it is hovered. it would be black(#000) if it is not defined
 * @param {string} props.onClick - any function that is called when the button is clicked
 */
const GradientButton:React.FC<GradientButtonProps> = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    return(
        <>
            <StyledButton 
                type={props.type}
                isDisabled={props.isDisabled}
                onClick={props.isDisabled? undefined:props.onClick}
                onMouseEnter={props.isDisabled? undefined:(e)=>setIsHovered(true)}
                onMouseLeave={props.isDisabled? undefined:(e)=>setIsHovered(false)}
                text={props.isDisabled && props.disabledText?props.disabledText:props.text} 
                width={props.width}
                padding={props.padding} 
                border={props.border} 
                backgroundColor={props.bgColor}>
                <StyledText 
                    color={props.textColor} 
                    hoveredColor={props.hoveredTextColor}
                    isHovered={isHovered} >
                        {props.text}
                </StyledText>
                <StyledSpan 
                    text={props.text}
                    bgColor={props.hoveredBgColor}
                    isHovered={isHovered}/>
            </StyledButton>
        </>
    )
};

export default GradientButton;