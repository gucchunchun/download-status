import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button } from './common/index';

interface FakeUpdateButtonProps {
    startFunc: ()=>void;
    stopFunc: ()=>void;
}
const StyledDiv = styled('div')`
    position: absolute;
    top: 1rem;
    left: 1rem;
`;
const FakeUpdateButton:React.FC<FakeUpdateButtonProps> = (props) => {
    const [isStop, setIsStop] = useState<boolean>(false);
    return(
        <StyledDiv>
            <Button.GradientButton
                text={isStop?'stop': 'start'}
                isDisabled={false}
                onClick={isStop? 
                            ()=>{
                                props.stopFunc();
                                setIsStop(false);
                                }
                            :()=>{
                                props.startFunc();
                                setIsStop(true);
                            }}/>
        </StyledDiv>
    )
};

export default FakeUpdateButton;