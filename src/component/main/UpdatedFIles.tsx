import React, { useState, useEffect, useMemo, useRef} from 'react';
import styled from '@emotion/styled';
import theme from '../../theme';
import * as Type from '../../Type';
import { Status } from './index';


interface UpdatedFileProps {
    file: Type.File;
    key: number;
    isLast: boolean;
}

interface FileDivProps {
    isLast: boolean;
};
const FileDiv = styled('div')<FileDivProps>`
    width: 100%;
    height: 30%;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: ${props=>props.isLast===true? 'none': '1px solid rgb(' + theme.colors.border + ')'};
`;
const FileInfoDiv = styled('div')`
    width: 50%; 
`;
const FileNameH5 = styled('h5')`
    color: ${theme.colors.textPrimary}
    font-weight: bold;
`;
const FileStatusP = styled('p')`
    color: ${theme.colors.textSecondary}
`;
const UpdatedFile:React.FC<UpdatedFileProps> = (props) => {
    const FileDivRef = useRef<HTMLDivElement|null>(null);
    
    return(
        <FileDiv isLast={props.isLast} ref={FileDivRef}>
            <Status file={props.file} onClick={()=>{}}/>
            <FileInfoDiv>
                <FileNameH5>{props.file.filename}</FileNameH5>
                <FileStatusP>
                    {props.file.status.status as string + ' ' + props.file.status.completed + '%'}
                </FileStatusP>
            </FileInfoDiv>
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
    display: flex;
    flex-direction: column;
    flexWrap: nowrap;
    justify-content: flex-start;
    overflow: scroll;
`;

const UpdatedFiles:React.FC<UpdatedFilesProps> = (props) => {
    return(
        <ContainerDiv>
            {props.files.map((file, index)=>{
                return <UpdatedFile 
                            file={file} 
                            key={index} 
                            isLast={index===props.files.length-1? true: false}/>
            })}
        </ContainerDiv>
    );
};

export default UpdatedFiles;