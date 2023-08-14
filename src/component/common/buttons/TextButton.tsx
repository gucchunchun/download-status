import React, { MouseEventHandler} from 'react';
import styled from '@emotion/styled';

interface TextButtonProps {
    width?: string
    height?: string
    type?: "button" | "submit" | "reset"
    text: string
    textColor?: string
    hoveredTextColor?: string
    onClick: MouseEventHandler
}
interface StyledButtonProps {
    text: string
    width?: string
    height?: string
    color?: string
    hoveredColor?: string
}

const StyledButton = styled('button')<StyledButtonProps>`
    width: ${props=>props.width || 'fit-content'};
    height: ${props=>props.height || 'fit-content'};
    color: ${props=>props.color || '#DCDCDC'};
    &:hover {
        color: ${props=>props.hoveredColor || '#000'};
    }
`;

const TextButton:React.FC<TextButtonProps> = (props) => {
    return(
        <>
            <StyledButton 
                text={props.text}
                width={props.width}
                height={props.height}
                color={props.textColor}
                hoveredColor={props.hoveredTextColor}
                type={props.type}
                onClick={props.onClick}
            >
                {props.text}
            </StyledButton>
        </>
    )
}

export default TextButton;