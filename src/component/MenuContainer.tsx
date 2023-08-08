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
        transition: "all 0.5s ease-in",
    }
    
    return(
        <div style={containerStyle} className='container' >
            <button className='cross' onClick={props.crossOnClick}></button>
            {props.menuList.map((menu, index) =>{
                return <Menu menu={menu} used={props.used} key={index} index={index} onClick={props.menuOnClick}/>;
            })}
        </div>
    );
}