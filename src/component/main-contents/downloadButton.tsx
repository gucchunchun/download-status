import React, {useState, useEffect} from 'react';

interface MyComponentProps {
    onClick: React.MouseEventHandler;
}

export default function DownloadButton(props:MyComponentProps) {
    const [isHovered, updateIsHovered] = useState<boolean>(false);
    function handleHover() {
        updateIsHovered((prev)=>{return !prev});
    }
    const buttonStyle: React.CSSProperties = {
        position: "relative",
        overflow: "hidden",
        transition: "0.5s ease all",
        width: "50%",
        height: "3rem",
        marginTop: "0.25rem",
        marginBottom: "0.25rem"
    }
    const pStyle: React.CSSProperties = {
        position: "relative",
        zIndex: "2",
        color: isHovered? "#FEFEFE":"#000",
        fontWeight: "bold",
        textAlign: "center",
    }
    const spanStyle: React.CSSProperties = {
        zIndex: "1",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        width: isHovered? "200%":"0",
        aspectRatio: "1/1",
        borderRadius: "50%",
        backgroundColor: "#69A823",
        transition: "0.5s ease all",
    }
    return(
        <button style={buttonStyle} onClick={props.onClick} onMouseEnter={handleHover} onMouseLeave={handleHover} >
            <p style={pStyle}>go to downloads</p>
            <span style={spanStyle}></span>
        </button>
    )
}