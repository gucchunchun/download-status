import React, {useState} from 'react';

interface MyComponentProps {
    onClick?: any;
    isDisabled?:boolean;
    disableMsg?:string;
    width:string;
    height:string;
    name:string
}

export default function BaseButton(props:MyComponentProps) {
    const [isHovered, updateIsHovered] = useState<boolean>(false);
    function handleHover() {
        updateIsHovered((prev)=>{return !prev});
    }
    const buttonStyle: React.CSSProperties = {
        position: "relative",
        overflow: "hidden",
        transition: "0.5s ease all",
        width: props.width,
        height: props.height,
    }
    const pStyle: React.CSSProperties = {
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        zIndex: "2",
        color: (isHovered&&!props.isDisabled)? "#FEFEFE":"#000",
        fontWeight: "bold",
        textAlign: "center",
        
    }
    const spanStyle: React.CSSProperties = {
        zIndex: "1",
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        width: (isHovered&&!props.isDisabled)? "200%":"0",
        aspectRatio: "1/1",
        borderRadius: "50%",
        backgroundColor: "#69A823",
        transition: "0.5s ease all",
    }
    return(
        <button style={buttonStyle} onClick={!props.isDisabled?props.onClick:null} onMouseEnter={handleHover} onMouseLeave={handleHover} className={props.isDisabled?"disabled":""} >
            <p style={pStyle}>{(props.isDisabled&&props.disableMsg)? props.disableMsg: props.name}</p>
            <span style={spanStyle}></span>
        </button>
    )
}