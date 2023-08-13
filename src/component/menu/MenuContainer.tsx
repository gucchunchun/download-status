import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import theme from '../../theme'
import * as Type from '../../Type';
import { Menu } from './index';

interface MenuContainerProps {
    files: Type.File[];
    used: number;
    menuCloseOnClick: ()=>void;
    updateOnClick: (index:number)=>void;
}

const ContainerDiv = styled('div')`
    width: 25rem;
    height: 25rem;
    padding: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: 5px;
    over-flow: scroll;
    background-color: rgb(${theme.colors.primary});
    border: 1px solid rgb(${theme.colors.border});
    border-radius: 5px;
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
        height: 10%;
        background-color: rgb(${theme.colors.secondary});
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
                return <Menu 
                            file={file} 
                            key={index} 
                            index={index} 
                            used={props.used} 
                            updateOnClick={props.updateOnClick} />
            })}
        </ContainerDiv>
    );
}

export default MenuContainer;