import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import theme from '../../theme'
import * as Type from '../../Type';
import { GradientButton } from '../index'

interface MenuProps {
    file: Type.File;
    index: number;
    used: number;
    updateOnClick: (index:number)=>void;
}

const ContainerDiv = styled('div')`
    width: 100%;
    height: 3rem;
    margin: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const FileInfoDiv = styled('div')`
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
`;
interface IconProps {
    icon: (Type.Icons|undefined);
}
const Icon = styled('div')<IconProps>`
    height: 100%;
    aspect-ratio: 1;
    background-image: url(${props=>props.icon?props.icon :'/img/fileIcon.svg'});
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
`;
const FileNameH5 = styled('h5')`
    width: 30%;
    margin: 0 1rem;
`;
const FileSizeP = styled('p')`
    width: fit-content;
`;
const Menu:React.FC<MenuProps> = (props) => {
    const lack = useMemo(()=>props.used + props.file.size - 1000, [props.file, props.used])
    return(
        <ContainerDiv>
            <FileInfoDiv>
                <Icon icon={props.file.icon}/>
                <FileNameH5>{props.file.filename}</FileNameH5>
                <FileSizeP>{lack<=0? props.file.size+"MG":"lack of " + lack +"MG"}</FileSizeP>
            </FileInfoDiv>
            <GradientButton 
                text={'update'} 
                isDisabled={lack<=0? false: true} 
                disabledText={'not available'}
                bgColor={`rgb(${theme.colors.primary})`} 
                hoveredBgColor={`rgb(${theme.colors.resolve})`} 
                textColor={`rgb(${theme.colors.textPrimary})`}
                hoveredTextColor={`rgb(${theme.colors.primary})`}
                onClick={()=>props.updateOnClick(props.index)}
                width={'6rem'}/>
        </ContainerDiv>
    )
};

export default Menu;