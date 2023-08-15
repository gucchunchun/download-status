import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import * as Type from '../../Type';
import { Form, Button } from '../common/index';
import { Avatar, EditableContent } from './index';

interface MyPageProps {
    userData: Type.User;
    setUserData?: Function;
}

const ContainerDiv = styled('div')`
    width: 16rem;
    height: fit-content;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;
const UserPrimaryInfoDiv = styled('div')`
    width: 100%;
    height: 8rem;
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const UserIdDiv = styled('div')`
    width: 45%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > * {
        margin-bottom: 0.5rem;
    }
`;
const MyPage:React.FC<MyPageProps> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);

    return(
        <ContainerDiv>
            <UserPrimaryInfoDiv>
                <Avatar avatarPath={props.userData.data.avatar} width='45%' height='100%' editMode={editMode}/>
                <UserIdDiv>
                    <EditableContent 
                    editMode={editMode} 
                    initialContent={props.userData.id} 
                    onChange={()=>{}}
                    fontSize={theme.font.size.h3} 
                    fontColor={theme.colors.textPrimary} 
                    fontWeight={theme.font.weight.heading} 
                    />
                    <EditableContent 
                    editMode={editMode} 
                    initialContent={props.userData.pwd} 
                    onChange={()=>{}}
                    fontSize={theme.font.size.p} 
                    fontColor={theme.colors.textPrimary} 
                    fontWeight={theme.font.weight.p} 
                    />
                </UserIdDiv>
            </UserPrimaryInfoDiv>
            
            <Button.GradientButton 
                text={editMode?'save':'edit'}
                isDisabled={false}
                width={'5rem'}
                textColor={`rgb(${theme.colors.textPrimary})`} 
                hoveredTextColor={`rgb(${theme.colors.primary})`} 
                bgColor={`rgb(${theme.colors.primary})`}
                hoveredBgColor={`rgb(${editMode?theme.colors.resolve:theme.colors.secondary})`}
                border={`1px solid rgb(${theme.colors.border})`}
            onClick={()=>setEditMode((prev)=>!prev)}
                />
        </ContainerDiv>
    )
}

export default MyPage;