import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme'
import * as Type from '../../Type';
import { Button, File } from '../common/index';


interface MenuFileProps {
    file: Type.File;
    index: number;
    used: number;
    isLast: boolean;
    updateOnClick: (index:number)=>void;
}
interface IconProps {
    icon: (Type.Icons|undefined);
}
const Icon = styled('div')<IconProps>`
    width: 20%;
    height: 100%;
    background-image: url(${props=>props.icon?props.icon :'/img/fileIcon.svg'});
    background-size: auto 80%;
    background-repeat: no-repeat;
    background-position: center;
`;

const MenuFile:React.FC<MenuFileProps> = (props) => {
    const lack = useMemo(()=>props.used + props.file.size - 1000, [props.file, props.used])
    return(
        <File.FileDiv isLast={props.isLast}>
            <Icon icon={props.file.icon}/>
            <File.FileInfo h5={props.file.filename} p={lack<=0? props.file.size+"MG":"lack of " + lack +"MG"} />
            <Button.GradientButton 
                text={'update'} 
                isDisabled={lack<=0? false: true} 
                disabledText={'not available'}
                bgColor={`rgb(${theme.colors.primary})`} 
                hoveredBgColor={`rgb(${theme.colors.resolve})`} 
                textColor={`rgb(${theme.colors.textPrimary})`}
                hoveredTextColor={`rgb(${theme.colors.primary})`}
                onClick={()=>props.updateOnClick(props.index)}
                width={'30%'}/>
        </File.FileDiv>
    )
};

export default MenuFile;