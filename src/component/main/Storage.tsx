import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import * as Type from '../../Type';

interface StorageProps {
    used: (number);
    height?: string;
}
interface ContainerDivProps {
    height?: string;
}
const ContainerDiv = styled('div')<ContainerDivProps>`
    width: 90%;
    height: ${props=>props.height || '10rem'};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(${theme.colors.primary});
    border: 1px solid rgb(${theme.colors.border});
    border-radius: 5px;
`;
const TitleH2 = styled('h2')`
    width: 100%;
    padding-left: 5%;
    text-align: left;
`;
const MeterDiv = styled('div')`
    width: 90%;
    height: 5%;
    border: 0.8px solid #000;
    border-radius: 5px;
`;
interface usedMeterProps {
    used: (number|null);
}
const UsedMeterDiv = styled('div')<usedMeterProps>`
    width: ${props=>props.used===null? 0: (props.used/10)+'%'};
    height: 100%;
    border: 0.8px solid #000;
    border-radius: 5px;
    background-color: #000;
    transition: width 0.3s;
`;
const UsageInfoP = styled('p')`
    width: 100%;
    text-align: center;
`;
const Storage:React.FC<StorageProps> = (props) => {
    return(
        <ContainerDiv>
            <TitleH2>cloud storage</TitleH2>
            <MeterDiv>
                <UsedMeterDiv used={props.used}/>
            </MeterDiv>
            <UsageInfoP>{props.used===1000? '1GB': props.used + 'MG'} / 1GB</UsageInfoP>
        </ContainerDiv>
    );
};

export default Storage;