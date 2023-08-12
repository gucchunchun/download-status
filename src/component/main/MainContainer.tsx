import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled'
import * as Type from '../../Type';
import { Storage } from './index';

interface MainContainerProps {
    used: (number|null);
}
interface ContainerProps {
    used: (number|null);
}
const Container = styled('div')<ContainerProps> `
    width: clamp(200px, 50%, 500px)
    aspect-ratio: 1/1;
    padding: 1rem;
    border-radius: 0.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    filter: ${props=>props.used===null? 'blur(4px)': 'blur(0)'}
`;

const MainContainer:React.FC<MainContainerProps> = (props) => {
    return(
        <Container used={props.used}>
            <Storage used={props.used}/>
        </Container>
    );
}

export default MainContainer;