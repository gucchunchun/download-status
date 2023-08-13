import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import theme from '../../theme'
import * as Type from '../../Type';
import { GradientButton } from '../index'

interface MenuProps {
    file: Type.File;
    index: number;
    used: number;
    onClick: Function;
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
    width: fit-content;
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
    background-image: url(${props=>props.icon?props.icon as string :'/img/fileIcon.svg'});
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center;
`;
const FileNameH5 = styled('h5')`
    width: fit-content;
    margin: 0 1rem;
`;
const FileSizeP = styled('p')`
    width: fit-content;
`;
const Menu:React.FC<MenuProps> = (props) => {
    const [isAvailable, setIsAvailable] = useState<boolean>(true);
    useEffect(() => {
        if (1000<props.used+props.file.size){
            setIsAvailable(false);
        }else {
            setIsAvailable(true);
        }
    },[props]);
    return(
        <ContainerDiv>
            <FileInfoDiv>
                <Icon icon={props.file.icon}/>
                <FileNameH5>{props.file.filename}</FileNameH5>
                <FileSizeP>{isAvailable? props.file.size+"MG":"lack of " + Math.abs(1000-props.used-props.file.size)+"MG"}</FileSizeP>
            </FileInfoDiv>
            <GradientButton 
                text={'update'} 
                isDisabled={isAvailable? false: true} 
                disabledText={'not available'}
                bgColor={`rgb(${theme.colors.primary})`} 
                hoveredBgColor={`rgb(${theme.colors.resolve})`} 
                textColor={`rgb(${theme.colors.textPrimary})`}
                hoveredTextColor={`rgb(${theme.colors.primary})`}/>
        </ContainerDiv>
    )
};

export default Menu;