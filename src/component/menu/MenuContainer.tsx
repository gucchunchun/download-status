import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme'
import * as Type from '../../Type';
import { MenuFile } from './index';

interface MenuContainerProps {
    files: Type.File[];
    used: number;
    menuCloseOnClick: ()=>void;
    updateOnClick: (index:number)=>void;
}

const ContainerDiv = styled('div')`
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: 20rem;
    height: 20rem;
    padding: 2rem;
    background-color: rgb(${theme.colors.primary});
    border: 1px solid rgb(${theme.colors.border});
    border-radius: 5px;
    overflow-y: scroll;
`;
const CrossButton = styled('button')`
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    width: 1rem;
    height: 1rem;
    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        width: 100%;
        height: 3px;
        background-color: rgb(${theme.colors.secondary});
        border-radius: 5px;
    }
    &::before {
        transform: rotate(45deg);
    }
    &::after {
        transform: rotate(-45deg);
    }
    &:hover {
        &::before,
        &::after {
            background-color: rgb(${theme.colors.border});
        }
    }
`;
const MenuContainer:React.FC<MenuContainerProps> = (props) => {
    
    return(
        <ContainerDiv>
            <CrossButton onClick={props.menuCloseOnClick} />
            {props.files.map((file, index)=>{
                return <MenuFile 
                            file={file} 
                            key={index} 
                            index={index} 
                            used={props.used} 
                            isLast={index === props.files.length-1}
                            updateOnClick={props.updateOnClick} />
            })}
        </ContainerDiv>
    );
}

export default MenuContainer;