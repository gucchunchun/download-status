import React, { useState } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { Button } from '../common/index';



interface HeaderProps {
    startFunc: ()=>void;
    stopFunc: ()=>void;
    isFormOpen: boolean;
    formOpenFunc: ()=>void;
}
const ContainerDiv = styled('div')`
    width: 100%;
    height: 4rem;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Header:React.FC<HeaderProps> = (props) => {
    const [isStop, setIsStop] = useState<boolean>(false);
    return(
        <ContainerDiv>
            <Button.GradientButton
                text={isStop?'stop': 'start'}
                isDisabled={false}
                width={'7rem'}
                textColor={`rgb(${theme.colors.textPrimary})`} 
                hoveredTextColor={`rgb(${theme.colors.primary})`} 
                hoveredBgColor={`rgb(${theme.colors.secondary})`}
                border={`1px solid rgb(${theme.colors.border})`}
                onClick={isStop? 
                            ()=>{
                                props.stopFunc();
                                setIsStop(false);
                                }
                            :()=>{
                                props.startFunc();
                                setIsStop(true);
                            }}/>
            <Button.GradientButton 
                text={props.isFormOpen?'back':'my page'}
                isDisabled={false}
                width={'7rem'}
                textColor={`rgb(${theme.colors.textPrimary})`} 
                hoveredTextColor={`rgb(${theme.colors.primary})`} 
                hoveredBgColor={props.isFormOpen?`rgb(${theme.colors.secondary})`:`rgb(${theme.colors.resolve})`}
                border={`1px solid rgb(${theme.colors.border})`}
                onClick={props.formOpenFunc}/>
        </ContainerDiv>
    )
}
export default Header;