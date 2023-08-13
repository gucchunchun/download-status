import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled'
import * as Type from '../../Type';
import theme from '../../theme';


interface UpdatedFileProps {
    file: File;
    key: number;
    isLast: boolean;
}

interface FileDivProps {
    isLast: boolean;
};
const FileDiv = styled('div')<FileDivProps>`
    width: 100%;
    height: 3rem;
    padding: 0.5rem 0;
    border-bottom: ${props=>props.isLast? 'none': '1px solid' + theme.colors.border};
`;

const UpdatedFile:React.FC<UpdatedFileProps> = (props) => {
    return(
        <FileDiv isLast={props.isLast}>

        </FileDiv>
    )
};


interface UpdatedFilesProps {
    files: Type.File[];
    height?: string;
};
interface ContainerDivProps {
    height?: string;
};
const ContainerDiv = styled('div')<ContainerDivProps>`
    width: 90%;
    height: ${props=>props.height || '35%'};
`;

const UpdatedFiles:React.FC<UpdatedFilesProps> = (props) => {
    return(
        <>
            {/* {props.files.map((file)=>{
                return <UpdatedFile />
            })} */}
        </>
    );
};

export default UpdatedFiles;