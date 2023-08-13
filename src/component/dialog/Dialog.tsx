import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import theme from '../../theme';

interface DialogDivProps {
    width?: string;
    height?: string;
    disabled: boolean;
}
const DialogDiv = styled('div')<DialogDivProps>`
    width: ${props => props.width || 'fit-content'};
    height: ${props => props.height || 'fit-content'};
    padding: 1rem;
    position: fixed;
    top: 50%;
    left: 50%;
    border: 1px solid #000;
    transform: translate(-50%, -50%); 
    display: ${props => (props.disabled ? 'none' : 'block')};
    opacity: ${props => (props.disabled ? '0' : '1')};
    transition: opacity 0.3s, display 0.3s;
    background-color: rgb(${theme.colors.primary});
`;

const Title = styled('h2')`
    text-align: left;
`;

interface DialogProps {
    title?: string;
    text?: string;
    width?: string;
    height?: string;
    onClick?: any;
    isDisabled: boolean;
    children?: React.ReactNode;
}
const Dialog:React.FC<DialogProps> = (props) => {
    const [isDisabled, setIsDisabled] = useState(false);
    useEffect(() => {
        setIsDisabled(props.isDisabled);
    },[props.isDisabled]);
    const handleClick = ():void => {
        if( props.onClick ) {
            props.onClick();
        }
        setIsDisabled(true);
    }
    return (
        <DialogDiv 
        role="dialog"
        aria-labelledby="dialog1Title"
        aria-describedby="dialog1Desc"
        width={props.width} height={props.height}
        disabled={isDisabled}>
            {props.title?<Title id="dialog1Title">{props.title}</Title>:null}
            {props.text?<p id="dialog1Desc">{props.text}</p>:null}
            {props.children?<>{props.children}</>:null}
            {props.children?null:<button onClick={handleClick}>Close</button>}
        </DialogDiv>
    );
};

export default Dialog;