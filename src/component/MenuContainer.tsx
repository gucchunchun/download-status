import React from 'react';
import Menu from  './menu-contents/Menu';
import {MenuFile} from '../App';


interface MyComponentProps {
    menuList: MenuFile[],
    menuOnClick: any;
    crossOnClick: any;
    isMenuOpen: boolean;
    used: number;
}
export default function MenuContainer(props:MyComponentProps) {
    let installFiles:MenuFile[] = [];
    function handleMenuOnClick(file:MenuFile):void {
        installFiles.push(file);
    }
    function handleCrossClick():void{
        props.menuOnClick(installFiles);
        props.crossOnClick();
    }
    const containerStyle: React.CSSProperties = {
        position: "absolute",
        zIndex: 10000,
        top: "50%",
        left: "50%",
        width: "30rem",
        height: props.menuList.length*5 + 4 + "rem",
        padding: "2rem 1rem 1rem",
        transform: props.isMenuOpen? "translate(-50%, -50%) scale(1)":"translate(-50%, -50%) scale(0)",
        filter: "none",
        transition: "all 0.3s ease-in",
        backgroundColor: "#FFFFFF",
    }
    
    return(
        <div style={containerStyle} className='container' >
            <button className='cross' onClick={handleCrossClick}></button>
            {props.menuList.map((menu, index) =>{
                return <Menu menu={menu} used={props.used} key={index} index={index} onClick={handleMenuOnClick}/>;
            })}
        </div>
    );
}