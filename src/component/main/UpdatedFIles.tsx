import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from '@emotion/styled';
import theme from '../../theme';
import * as Type from '../../Type';
import { UpdatedFile } from './index';


interface UpdatedFilesProps {
    files: Type.File[];
    statusOnClick: (status: Type.Status, index:number) => void;
    deleteOnClick: (index:number) => void;
    height?: string;
};
interface ContainerDivProps {
    height?: string;
};
const ContainerDiv = styled('div')<ContainerDivProps>`
    width: 90%;
    height: ${props=>props.height || '15rem'};
    display: flex;
    flex-direction: column;
    flexWrap: nowrap;
    justify-content: flex-start;
    overflow: scroll;
`;

const UpdatedFiles:React.FC<UpdatedFilesProps> = (props) => {
    return(
        <ContainerDiv>
            {props.files.length===0?
                <p>no file is updated</p>
            :
            props.files.map((file, index)=>{
                return <UpdatedFile 
                            file={file} 
                            key={index} 
                            index={index} 
                            isLast={index===props.files.length-1? true: false}
                            statusOnClick={props.statusOnClick}
                            deleteOnClick={props.deleteOnClick}/>
            })
            }
        </ContainerDiv>
    );
};

export default UpdatedFiles;