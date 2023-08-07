import React, {useState} from 'react';
import { Storage, DownloadButton, DownloadFiles } from './main-contents/index';

interface MyComponentProps {
    isOpen: boolean;
}

export default function MainContainer(props:MyComponentProps) {
    const containerStyle: React.CSSProperties = {
        width: "22rem",
        height: "22rem",
        padding: "1rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
    const [downloadIsOpen, updateIsOpen] = useState(false);
    function handleButtonClick():void {
        if(!downloadIsOpen) {
            updateIsOpen(true);
        }
    }
    return (
    <div className={props.isOpen ? 'container' : 'hidden container'} style={containerStyle}>
        <Storage used={0}/>
        <DownloadFiles />
        <DownloadButton onClick={handleButtonClick}/>
    </div>
    );
}