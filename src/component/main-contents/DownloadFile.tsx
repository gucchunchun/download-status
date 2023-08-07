import React, {useState, useEffect} from 'react';
import Settingbutton from "./SettingButton";
import Canvas from "./Canvas";

interface File {
    name: string;
    state: (number|string);
}
interface MyComponentProps{
    file: File;
    key: number;
}
export default function DownloadFile(props:MyComponentProps) {
    const [settingOpen, updateSettingOpen] = useState(false);
    function handleSettingButtonClick() {
        updateSettingOpen(true);
    }
    useEffect(()=>{}, [props.file.state]);

    const containerStyle: React.CSSProperties = {
        width: "100%",
        height: "3rem",
        margin: "0.25rem 0"
    }
    const canvasButtonStyle: React.CSSProperties = {
        width: "3rem",
        height: "3rem",
        margin: "0 1rem",
        padding: 0,
        border: "1px solid black"
    }
    const canvasStyle: React.CSSProperties = {
        width: "100%",
        aspectRatio: "1/1",
    }
    const textStyle: React.CSSProperties = {
        width: "calc(100% - 8rem)",
        height: "100%",
        padding: "0 1rem",
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }
    
    return(
        <div className='containerRow' style={containerStyle}>
            <button style={canvasButtonStyle} >
                <canvas  style={canvasStyle} width="3rem" height="3rem"></canvas>
            </button>
            <div style={textStyle}>
                <h3>{props.file.name}</h3>
                <p>{typeof props.file.state==="string"? props.file.state: props.file.state + "%"}</p>
            </div>
            <SettingButton onClick={handleSettingButtonClick}/>
        </div>
    );
}