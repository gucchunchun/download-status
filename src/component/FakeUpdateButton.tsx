import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { GradientButton } from './index';

interface FakeUpdateButtonProps {
    startFunc: ()=>void;
    stopFunc: ()=>void;
}
const StyledButton = styled(GradientButton)`
    position: absolute;
    bottom: 1rem;
    left: 1rem;
`;
const FakeUpdateButton:React.FC<FakeUpdateButtonProps> = (props) => {
    const [isStop, setIsStop] = useState<boolean>(false);
    return(
        <>
            <StyledButton 
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
        </>
    )
};

export default FakeUpdateButton;