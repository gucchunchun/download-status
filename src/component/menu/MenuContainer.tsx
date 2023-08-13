import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import theme from '../../theme'
import * as Type from '../../Type';
import { Menu } from './index';

interface MenuContainerProps {
    isOpen?: boolean;
    menuOnClick?: React.MouseEventHandler;
    statusOnClick?: Function;
    isMenuOpen?: boolean;
    files: Type.File[];
    used: number;
    deleteFile?: Function;
}

const ContainerDiv = styled('div')`
    width: 22rem;
    height: 22rem;
    padding: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: 5px;
    over-flow: scroll;
    background-color: rgb(${theme.colors.primary});
`;
const CrossButton = styled('button')`
    position: absolute;
    top: 0;
    right: 0;
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
        height: 5%;
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
            <CrossButton />
            {props.files.map((file, index)=>{
                return <Menu file={file} key={index} index={index} used={props.used} onClick={()=>{}}></Menu>
            })}
        </ContainerDiv>
    );
}

export default MenuContainer;