import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import theme from '../../theme';
import * as Type from '../../Type';
import { Storage, UpdatedFiles } from './index';
import { GradientButton } from '../index';


//TODO: add FUNC

interface MainContainerProps {
    used: (number|null);
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
    filter: ${props=>props.used===null? 'blur(4px)': 'blur(0)'}
    background-color: rgb(${theme.colors.primary});
    border: 1px solid rgb(${theme.colors.border});
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const MainContainer:React.FC<MainContainerProps> = (props) => {
    const testFile:Type.File = {filename:'text', size:300, status: {status: Type.Status.Updating, completed:30}}
    const testFile2:Type.File = {filename:'text', size:300, status: {status: Type.Status.Waiting, completed:0}}
    const testFile3:Type.File = {filename:'text', size:300, status: {status: Type.Status.Pausing, completed:60}}
    return(
        <ContainerDiv used={props.used}>
            <Storage used={props.used} />
            <UpdatedFiles files={[testFile, testFile2, testFile3]} onStatusClick={()=>{}} deleteFile={()=>{}}/>
            <GradientButton 
                text={'update files'} 
                textColor={`rgb(${theme.colors.textPrimary})`} 
                hoveredTextColor={`rgb(${theme.colors.primary})`} 
                border={`1px solid rgb(${theme.colors.border})`}
                bgColor={`rgb(${theme.colors.primary})`} 
                hoveredBgColor={`rgb(${theme.colors.resolve})`}  />
        </ContainerDiv>
    );
}

export default MainContainer;