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
                textColor={`rgb(${theme.colors.textPrimary})`} 
                hoveredTextColor={`rgb(${theme.colors.primary})`} 
                hoveredBgColor={`rgb(${theme.colors.secondary})`}
                border={`rgb(${theme.colors.border})`}
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
                text={props.isFormOpen?'back to cloud':'my page'}
                isDisabled={false}
                textColor={`rgb(${theme.colors.textPrimary})`} 
                hoveredTextColor={`rgb(${theme.colors.primary})`} 
                hoveredBgColor={`rgb(${theme.colors.resolve})`}
                border={`rgb(${theme.colors.border})`}
                onClick={isStop? 
                    ()=>{
                        props.stopFunc();
                        setIsStop(false);
                        }
                    :()=>{
                        props.startFunc();
                        setIsStop(true);
                    }}/>
        </ContainerDiv>
    )
}
export default Header;