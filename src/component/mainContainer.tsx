import React from 'react';
import { Storage, DownloadFiles} from './main-contents/index';
import BaseButton from './BaseButton';
import {File} from '../App';

interface MyComponentProps {
    isOpen: boolean;
    menuOnClick: React.MouseEventHandler;
    isMenuOpen: boolean;
    files:File[];
    used: number;
}

export default function MainContainer(props:MyComponentProps) {
    const containerStyle: React.CSSProperties = {
        width: "22rem",
        height: "22rem",
        padding: "1rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        borderRadius: "5px",
        boxShadow: "1px 1px 20px rgba(0,0,0,0.1), -1px -1px 20px rgba(0,0,0,0.1)",
        filter: props.isMenuOpen? "blur(4px)":"blur(0)",
        transform: props.isMenuOpen? "translate(-50%, -50%) scale(0)":"translate(-50%, -50%) scale(1)",
        transition: "all 0.3s ease-in"
    }
    return (
    <div className={props.isOpen ? 'container' : 'hidden container'} style={containerStyle}>
        <Storage used={props.used}/>
        <DownloadFiles files={props.files}/>
        <BaseButton onClick={props.menuOnClick} width={"50%"} height={"3rem"} name={"go to downloads"} isDisabled={props.isMenuOpen}/>
    </div>
    );
}