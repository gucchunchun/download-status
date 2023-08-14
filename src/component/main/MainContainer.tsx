import React from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import * as Type from '../../Type';
import { Storage, UpdatedFiles } from './index';
import { Button } from '../common/index';

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
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: clamp(19rem, 50vw, 28rem); 
    height: fit-content;
    padding: 1rem;
    background-color: rgb(${theme.colors.primary});
    border: 1px solid rgb(${theme.colors.border});
    border-radius: 5px;
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
            <Button.GradientButton 
                text={'update files'} 
                isDisabled={false}
                textColor={`rgb(${theme.colors.textPrimary})`} 
                hoveredTextColor={`rgb(${theme.colors.primary})`} 
                border={`1px solid rgb(${theme.colors.border})`}
                bgColor={`rgb(${theme.colors.primary})`} 
                hoveredBgColor={`rgb(${theme.colors.textPrimary})`}
                onClick={props.menuOpenOnClick}  />
        </ContainerDiv>
    );
}

export default MainContainer;