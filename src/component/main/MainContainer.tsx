import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import theme from '../../theme';
import * as Type from '../../Type';
import { Storage, UpdatedFiles } from './index';
import { GradientButton } from '../index';


//TODO: add FUNC

interface MainContainerProps {
    files: Type.File[];
    used: number;
    menuOpenOnClick: () => void;
    statusOnClick: (status: Type.Status, index:number) => void;
    deleteOnClick: (index:number) => void;
}

interface ContainerProps {
    used: (number|null);
}
const ContainerDiv = styled('div')<ContainerProps> `
    width: clamp(12.5rem, 50vw, 31.25rem);
    height: fit-content;
    padding: 1rem;
    border-radius: 0.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    filter: ${props=>props.used===null? 'blur(4px)': 'blur(0)'};
    background-color: rgb(${theme.colors.primary});
    border: 1px solid rgb(${theme.colors.border});
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const MainContainer:React.FC<MainContainerProps> = (props) => {
    return(
        <ContainerDiv used={props.used}>
            <Storage used={props.used} />
            <UpdatedFiles 
                files={props.files} 
                statusOnClick={props.statusOnClick} 
                deleteOnClick={props.deleteOnClick}/>
            <GradientButton 
                text={'update files'} 
                isDisabled={false}
                textColor={`rgb(${theme.colors.textPrimary})`} 
                hoveredTextColor={`rgb(${theme.colors.primary})`} 
                border={`1px solid rgb(${theme.colors.border})`}
                bgColor={`rgb(${theme.colors.primary})`} 
                hoveredBgColor={`rgb(${theme.colors.resolve})`}
                onClick={props.menuOpenOnClick}  />
        </ContainerDiv>
    );
}

export default MainContainer;