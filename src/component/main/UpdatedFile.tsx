import React, { useRef } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import * as Type from '../../Type';
import { Status, SettingButton } from './index';
import { File } from '../common/index';

interface UpdatedFileProps {
    file: Type.File;
    index: number;
    isLast: boolean;
    statusOnClick: (status: Type.Status, index:number) => void;
    deleteOnClick: (index:number) => void;
}

const UpdatedFile:React.FC<UpdatedFileProps> = (props) => {
    
    return(
        <File.FileDiv isLast={props.isLast}>
            <Status file={props.file} onClick={()=>props.statusOnClick(props.file.status.status, props.index)}/>
            <File.FileInfo h5={props.file.filename} p={props.file.status.status + ' ' + props.file.status.completed + '%'} />
            <SettingButton deleteOnClick={()=>props.deleteOnClick(props.index)}/>
        </File.FileDiv>
    )
};

export default UpdatedFile;