import React, { useState, useEffect, MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import theme from '../../../styles/theme';

interface DialogProps {
    title?: string;
    text?: string;
    width?: string;
    height?: string;
    onClick?: MouseEventHandler;
    isDisabled: boolean;
    children?: React.ReactNode;
}

interface DialogDivProps {
    width?: string;
    height?: string;
    disabled: boolean;
}
const DialogDiv = styled('div')<DialogDivProps>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    width: ${props => props.width || 'fit-content'};
    height: ${props => props.height || 'fit-content'};
    padding: 1rem;
    background-color: rgb(${theme.colors.primary});
    border: 1px solid rgb(${theme.colors.border});
    border-radius: 5px;
    display: ${props => (props.disabled ? 'none' : 'block')};
    opacity: ${props => (props.disabled ? '0' : '1')};
    transition: opacity 0.3s, display 0.3s;
    
`;
const Title = styled('h2')`
    text-align: left;
`;
/**
 * 
 * @param {string} props.title -dialog title. it will be showed with h2 tag
 * @param {string} props.text -dialog description text. it will be shown with p tag
 * @param {string} props.width -dialog width. default = fit-content
 * @param {string} props.height -dialog height. default = fit-content
 * @param {Function} props.onClick -will be executed before this dialog closed
 * @param {boolean} props.isDisabled -if this dialog is open(visible) or not
 * @param {boolean} props.children -it will showed after title & text if you defined them
 * @returns dialog component
 */
const Dialog:React.FC<DialogProps> = (props) => {
    const [isDisabled, setIsDisabled] = useState(false);
    useEffect(() => {
        setIsDisabled(props.isDisabled);
    },[props.isDisabled]);
    const handleClick = (e:React.MouseEvent):void => {
        if( props.onClick ) {
            props.onClick(e);
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