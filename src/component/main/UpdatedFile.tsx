import React, { useRef } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
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
    height: 3.5rem;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: ${props=>props.isLast===true? 'none': '1px solid rgb(' + theme.colors.border + ')'};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const FileInfoDiv = styled('div')`
    width: 50%; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
`;
const UpdatedFile:React.FC<UpdatedFileProps> = (props) => {
    
    const FileDivRef = useRef<HTMLDivElement|null>(null);
    
    return(
        <FileDiv isLast={props.isLast} ref={FileDivRef}>
            <Status file={props.file} onClick={()=>props.statusOnClick(props.file.status.status, props.index)}/>
            <FileInfoDiv>
                <h5>{props.file.filename}</h5>
                <p>
                    {props.file.status.status + ' ' + props.file.status.completed + '%'}
                </p>
            </FileInfoDiv>
            <SettingButton deleteOnClick={()=>props.deleteOnClick(props.index)}/>
        </FileDiv>
    )
};

export default UpdatedFile;