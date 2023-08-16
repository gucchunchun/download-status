import React, { useState, useEffect, MouseEvent } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { Button } from '../common/index';

interface AvatarProps {
    avatarPath: (string|null)
    width: string
    height: string
    editMode: boolean
    change_avatar:(path: string) => void
    setSelectedFile:(path: string) => void
}

interface AvatarContainerProps {
    width: string;
    height: string;
}
const AvatarContainer = styled('div')<AvatarContainerProps>`
    width: ${props=>props.width};
    height: ${props=>props.height};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
interface AvatarImgProps {
    editMode: boolean;
}
const AvatarImg = styled('img')<AvatarImgProps>`
    height: ${props=>props.editMode?'60%':'90%'};
    aspect-ratio: 1;
    padding: 5px;
    border: 1px solid rgb(${theme.colors.border});
    border-radius: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;
const EditContainer = styled('div')`
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
const HiddenInput = styled('input')`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
`;
const InputDiv = styled('div')`
    position: relative;
    width: fit-content;
`;
const Avatar:React.FC<AvatarProps> = (props) => {
    
    function handleImageChange(event:React.ChangeEvent<HTMLInputElement>):void {
        const files = event.target.files;
        if (files&&files.length>=1){
            const file = files[0];
            if (file) {
            props.setSelectedFile(URL.createObjectURL(file));
            }
        }
    }
    
    return(
        <AvatarContainer width={props.width} height={props.height}>
            <AvatarImg 
                src={props.avatarPath?props.avatarPath:'/img/user.png'} 
                alt="user avatar" 
                editMode={props.editMode}/>
            {props.editMode?
                <EditContainer>
                    <Button.TextButton 
                        text={'edit'}
                        onClick={()=>{}}/>
                    <InputDiv>
                        <Button.TextButton
                                text={'change'}>
                            <HiddenInput 
                                    id="avatarUpload"
                                    type='file' 
                                    accept="image/*"
                                    onChange={(e)=>handleImageChange(e)}/>
                        </Button.TextButton>
                    </InputDiv>
                </EditContainer>
            :null}
        </AvatarContainer>
    );
};

export default Avatar;