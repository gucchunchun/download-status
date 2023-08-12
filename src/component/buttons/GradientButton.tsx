import React, { useState } from 'react';
import styled from '@emotion/styled';

interface GradientButtonProps {
    text: string;
    type?: "button" | "submit" | "reset" ;
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
    padding?: string;
    border?: string;
    backgroundColor?: string;
}
const StyledButton = styled('button')<StyledButtonProps>`
    position: relative;
    overflow: hidden;
    width: ${props=> props.text.length + 'rem'};
    height: 1rem;
    padding: ${props=>props.padding || '0.5em'};
    box-sizing: content-box;
    border: ${props=>props.border || '1px solid #000'};
    border-radius: 0.5rem;
    background-color: ${props=>props.backgroundColor || '#FFFFFF'};
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
const GradientButton:React.FC<GradientButtonProps> = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    return(
        <>
            <StyledButton 
                type={props.type}
                onClick={props.onClick}
                onMouseEnter={(e)=>setIsHovered(true)}
                onMouseLeave={(e)=>setIsHovered(false)}
                text={props.text} 
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