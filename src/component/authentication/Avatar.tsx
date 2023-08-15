import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { Button } from '../common/index';

interface AvatarProps {
    avatarPath: (string|null)
    width: string
    height: string
    editMode: boolean
}

interface AvatarContainerProps {
    width: string;
    height: string;
}
const AvatarContainer = styled('div')<AvatarContainerProps>`
    width: ${props=>props.width};
    height: ${props=>props.height};
`;
interface AvatarImgProps {
    editMode: boolean;
}
const AvatarImg = styled('img')<AvatarImgProps>`
    height: ${props=>props.editMode?'60%':'80%'};
    aspect-ratio: 1;
    padding: 5px;
    border: 2px solid rgb(${theme.colors.border});
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
const Avatar:React.FC<AvatarProps> = (props) => {
    const [avatar, setAvatar] = useState(null);

    useEffect(()=>{
        //get avatar data from server
        setAvatar(null);
    },[]);
    return(
        <AvatarContainer width={props.width} height={props.height}>
            <AvatarImg src={avatar?URL.createObjectURL(avatar):'/img/user.png'} alt="user avatar" editMode={props.editMode}/>
            {props.editMode?
                <EditContainer>
                    <Button.TextButton 
                        text={'edit'}
                        onClick={()=>{}}/>
                    <Button.TextButton 
                        text={'change'}
                        onClick={()=>{}}/>
                </EditContainer>
            :null}
        </AvatarContainer>
    );
};

export default Avatar;