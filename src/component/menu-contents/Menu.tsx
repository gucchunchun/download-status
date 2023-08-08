import React, { useState, useEffect }from 'react';
import BaseButton from '../BaseButton';
import {MenuFile} from '../../App';

interface MyComponentProps {
    menu: MenuFile,  
    used: number;
    onClick?: any;
    index:number;
}

export default function Menu(props:MyComponentProps) {
    const [isAvailable, updateIsAvailable] = useState<boolean>(true);
    useEffect(() => {
        if (1000<props.used+props.menu.size){
            updateIsAvailable(false);
        }else {
            updateIsAvailable(true);
        }
    },[props]);
    
    const containerStyle: React.CSSProperties ={
        width: "100%",
        height: "3rem",
        margin: "1rem 0",
        backgroundColor: "transparent",
    }
    const src: string = props.menu.icon as string;
    const iconStyle: React.CSSProperties ={
        height: "3rem",
        backgroundColor: `url(${src})`,
    }
    const fileNameStyle: React.CSSProperties ={
        width: "40%",
        textAlign: "left",
    }
    const textStyle: React.CSSProperties ={
        width: "10%",
        textAlign: "left",
    }
    return(
        <div className='containerRow' style={containerStyle}>
            <div style={iconStyle} className={props.menu.icon as string}>
                <img src={src} alt="Slack Icon" />
            </div>
            <h3 style={fileNameStyle}>{props.menu.name}</h3>
            <p style={textStyle}>{isAvailable? props.menu.size+"MG":"lack of " + Math.abs(1000-props.used-props.menu.size)+"MG"}</p>
            <BaseButton width={"25%"} height={"3rem"} name={"install"} isDisabled={!isAvailable} disableMsg={!isAvailable? "over capacity":undefined} onClick={()=>props.onClick(props.menu)}/>
        </div>
    );
}
