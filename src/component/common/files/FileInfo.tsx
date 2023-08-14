import React from 'react';
import styled from '@emotion/styled';
import * as Type from '../../../Type';

interface FileInfoProps {
    h5: string;
    p: string;
}

const FileInfoDiv = styled('div')`
    width: 50%; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
`;
const FileInfo:React.FC<FileInfoProps> = (props) => {
    
    return(
        <FileInfoDiv>
            <h5>{props.h5}</h5>
            <p>
                {props.p}
            </p>
        </FileInfoDiv>
    )
};

export default FileInfo;