import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled'
import * as Type from '../../Type';

interface StorageProps {
    used: (number|null);
}

const Container = styled('div')`
    width: 22rem;
    height: 25%;
`;
const Title = styled('h2')`
    width: 100%;
    padding-left: 5%;
    text-align: left;
`;
const Meter = styled('div')`
    width: 90%;
    height: 5%;
    border: 0.8px solid #000;
    border-radius: 5px;
`;
interface usedMeterProps {
    used: (number|null);
}
const UsedMeter = styled('div')<usedMeterProps>`
    width: ${props=>props.used===null? 0: (props.used/10)+'%'};
    height: 100%;
    border: 0.8px solid #000;
    border-radius: 5px;
    background-color: #000;
    transition: width 0.3s;
`;
const UsageInfo = styled('p')`
    width: 100%;
    text-align: center;
`;
const Storage:React.FC<StorageProps> = (props) => {
    return(
        <Container>
            <Title>cloud storage</Title>
            <Meter>
                <UsedMeter used={props.used}/>
            </Meter>
            <UsageInfo>{props.used===1000? '1GB': props.used + 'MG'} MB / 1GB</UsageInfo>
        </Container>
    );
};

export default Storage;