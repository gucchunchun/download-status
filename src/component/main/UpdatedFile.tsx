import React, { useState, useEffect, useMemo, useRef} from 'react';
import styled from '@emotion/styled';
import theme from '../../theme';
import * as Type from '../../Type';
import { Status, SettingButton } from './index';

interface UpdatedFileProps {
    file: Type.File;
    index: number;
    isLast: boolean;
    statusOnClick: (status: Type.Status, index:number) => void;
    deleteOnClick: (index:number) => void;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
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
            <Status file={props.file} onClick={()=>props.statusOnClick(props.file.status.status, props.index)}/>
            <FileInfoDiv>
                <FileNameH5>{props.file.filename}</FileNameH5>
                <FileStatusP>
                    {props.file.status.status + ' ' + props.file.status.completed + '%'}
                </FileStatusP>
            </FileInfoDiv>
            <SettingButton deleteOnClick={()=>props.deleteOnClick(props.index)}/>
        </FileDiv>
    )
};

export default UpdatedFile;