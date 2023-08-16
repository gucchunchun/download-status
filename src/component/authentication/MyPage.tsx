import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import * as Type from '../../Type';
import { Button } from '../common/index';
import { Avatar, EditableContent } from './index';
import TextButton from '../common/buttons/TextButton';

interface MyPageProps {
    userData: Type.User
    updatedFiles: Type.File[]
    setUserData: (new_userData: Type.User) => void
    save_userData: (new_userData?: Type.User) => void
}

const ContainerDiv = styled('div')`
    width: fit-content;
    height: fit-content;
    min-width: 16rem;
    padding: 0.5rem;
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
const UserSecondaryInfoDiv = styled('div')`
    width: 100%;
    height: fit-content;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
`;
const ButtonContainerDiv = styled('div')`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;
const MyPage:React.FC<MyPageProps> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [id, setId] = useState(props.userData.id);
    const [pwd, setPwd] = useState(props.userData.pwd);
    const [firstName, setFirstName] = useState(props.userData.data.name.first||'');
    const [middleName, setMiddleName] = useState(props.userData.data.name.middle||'');
    const [lastName, setLastName] = useState(props.userData.data.name.last||'');
    const [email, setEmail] = useState(props.userData.data.email||'');
    const [phone, setPhone] = useState(props.userData.data.phone||'');
    const [birthday, setBirthday] = useState(
        props.userData.data.birthday.year===null||props.userData.data.birthday.month==null||props.userData.data.birthday.day==null?
        ''
        :
        props.userData.data.birthday.year + '-' + 
        (props.userData.data.birthday.month<10?'0'+props.userData.data.birthday.month:props.userData.data.birthday.month) + '-' + 
        (props.userData.data.birthday.day<10?'0'+props.userData.data.birthday.day:props.userData.data.birthday.day));
    const [country, setCountry] = useState(props.userData.data.country||'');
    const [address, setAddress] = useState(props.userData.data.address||'');
    const [gender, setGender] = useState(props.userData.data.gender||'');
    const [avatarPath, setAvatarPath] = useState(props.userData.data.avatar||null);
    const [selectedFile, setSelectedFile] = useState<(string|null)>(null);

    function handleSaveClick() {
        if(selectedFile) {
            handleUpload();
        }
        const new_userData = {
            id: id===''?props.userData.id:id,
            pwd: pwd===''?props.userData.pwd:pwd,
            data: {
                name: {
                  first: firstName,
                  middle: middleName,
                  last: lastName,
                },
                email: email,
                phone: phone,
                birthday: {
                  year: Number(birthday.split('-')[0]),
                  month: Number(birthday.split('-')[1]),
                  day: Number(birthday.split('-')[2]),
                },
                country: country,
                address: address,
                gender: gender,
                avatar: avatarPath,
                updatedFiles: props.updatedFiles.map(file => file.filename)
            }
        }
        props.setUserData(new_userData);
        props.save_userData(new_userData);
    }
    function handleInitializeClick() {
        setId(props.userData.id);
        setPwd(props.userData.pwd);
        setFirstName(props.userData.data.name.first||'');
        setMiddleName(props.userData.data.name.middle||'');
        setLastName(props.userData.data.name.last||'');
        setEmail(props.userData.data.email||'');
        setPhone(props.userData.data.phone||'');
        setBirthday(
            props.userData.data.birthday.year===null||props.userData.data.birthday.month==null||props.userData.data.birthday.day==null?
            ''
            :
            props.userData.data.birthday.year + '-' + 
            (props.userData.data.birthday.month<10?'0'+props.userData.data.birthday.month:props.userData.data.birthday.month) + '-' + 
            (props.userData.data.birthday.day<10?'0'+props.userData.data.birthday.day:props.userData.data.birthday.day));
        setCountry(props.userData.data.country||'');
        setAddress(props.userData.data.address||'');
        setGender(props.userData.data.gender||'');
        setAvatarPath(props.userData.data.avatar||null);
    }
    async function handleUpload() {
        const formData = new FormData();
        
        // Fetch the blob data from the Blob URL
        const blobResponse = await fetch(selectedFile as string);
        const blobData = await blobResponse.blob();
        
        // Create a File object from the blob data
        const file = new File([blobData], 'filename.png', { type: 'image/png' }); // Adjust filename and type as needed
        
        formData.append('file', file);
        formData.append('userId', id === '' ? props.userData.id : id);
        
        fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        .then((res) => res.json())
        .then((data) => console.log(data.message))
        .catch((err) => console.error('Error uploading image:', err));
    }
      
    return(
        <ContainerDiv>
            <UserPrimaryInfoDiv>
                <Avatar 
                    avatarPath={selectedFile?selectedFile:avatarPath} 
                    width='45%' 
                    height='100%' 
                    editMode={editMode} 
                    change_avatar={(path:string)=>setAvatarPath(path)}
                    setSelectedFile={(path:string)=>setSelectedFile(path)}/>
                <UserIdDiv>
                    <EditableContent 
                    editMode={editMode} 
                    initialContent={firstName} 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setFirstName(e.target.value)}}
                    fontSize={theme.font.size.h3} 
                    fontColor={theme.colors.textPrimary} 
                    fontWeight={theme.font.weight.heading} 
                    />
                    <EditableContent 
                    editMode={editMode} 
                    initialContent={id} 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setId(e.target.value)}}
                    fontSize={theme.font.size.p} 
                    fontColor={theme.colors.textPrimary} 
                    fontWeight={theme.font.weight.p} 
                    label={'ID:'}
                    labelInline={true}
                    labelFontSize={theme.font.size.p} 
                    />
                </UserIdDiv>
            </UserPrimaryInfoDiv>
                
            <UserSecondaryInfoDiv>
                <EditableContent 
                    editMode={editMode} 
                    initialContent={firstName} 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setFirstName(e.target.value)}}
                    fontSize={theme.font.size.p}
                    fontColor={theme.colors.textPrimary} 
                    fontWeight={theme.font.weight.p} 
                    label={'first name:'}
                    labelInline={true}
                    labelFontSize={theme.font.size.p}
                    labelWidth={'40%'}/>
                <EditableContent 
                    editMode={editMode} 
                    initialContent={middleName} 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setMiddleName(e.target.value)}}
                    fontSize={theme.font.size.p}
                    fontColor={theme.colors.textPrimary} 
                    fontWeight={theme.font.weight.p} 
                    label={'middle name:'}
                    labelInline={true}
                    labelFontSize={theme.font.size.p}
                    labelWidth={'40%'}/>
                <EditableContent 
                    editMode={editMode} 
                    initialContent={lastName} 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setLastName(e.target.value)}}
                    fontSize={theme.font.size.p}
                    fontColor={theme.colors.textPrimary} 
                    fontWeight={theme.font.weight.p} 
                    label={'last name:'}
                    labelInline={true}
                    labelFontSize={theme.font.size.p}
                    labelWidth={'40%'}/>
                <EditableContent 
                    editMode={editMode} 
                    initialContent={email} 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}}
                    fontSize={theme.font.size.p}
                    fontColor={theme.colors.textPrimary} 
                    fontWeight={theme.font.weight.p} 
                    label={'email:'}
                    labelInline={true}
                    labelFontSize={theme.font.size.p}
                    labelWidth={'40%'}/>
                <EditableContent 
                    editMode={editMode} 
                    initialContent={phone} 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setPhone(e.target.value)}}
                    fontSize={theme.font.size.p}
                    fontColor={theme.colors.textPrimary} 
                    fontWeight={theme.font.weight.p} 
                    type={'tel'}
                    label={'phone:'}
                    labelInline={true}
                    labelFontSize={theme.font.size.p}
                    labelWidth={'40%'}/>
                <EditableContent 
                    editMode={editMode} 
                    initialContent={birthday} 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setBirthday(e.target.value)}}
                    fontSize={theme.font.size.p}
                    fontColor={theme.colors.textPrimary} 
                    fontWeight={theme.font.weight.p} 
                    type={'date'}
                    label={'birthday:'}
                    labelInline={true}
                    labelFontSize={theme.font.size.p}
                    labelWidth={'40%'}/>
                <EditableContent 
                    editMode={editMode} 
                    initialContent={country} 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setCountry(e.target.value)}}
                    fontSize={theme.font.size.p}
                    fontColor={theme.colors.textPrimary} 
                    fontWeight={theme.font.weight.p} 
                    label={'country:'}
                    labelInline={true}
                    labelFontSize={theme.font.size.p}
                    labelWidth={'40%'}/>
                <EditableContent 
                    editMode={editMode} 
                    initialContent={address} 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setAddress(e.target.value)}}
                    fontSize={theme.font.size.p}
                    fontColor={theme.colors.textPrimary} 
                    fontWeight={theme.font.weight.p} 
                    label={'address:'}
                    labelInline={true}
                    labelFontSize={theme.font.size.p}
                    labelWidth={'40%'}/>
                <EditableContent 
                    editMode={editMode} 
                    initialContent={gender} 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setGender(e.target.value as Type.Gender)}}
                    fontSize={theme.font.size.p}
                    fontColor={theme.colors.textPrimary} 
                    fontWeight={theme.font.weight.p} 
                    type={'radio'}
                    options={Object.values(Type.Gender)}
                    label={'gender:'}
                    labelInline={true}
                    labelFontSize={theme.font.size.p}
                    labelWidth={'40%'}/>
                <EditableContent 
                    editMode={editMode} 
                    initialContent={pwd} 
                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setPwd(e.target.value as Type.Gender)}}
                    fontSize={theme.font.size.p}
                    fontColor={theme.colors.textPrimary} 
                    fontWeight={theme.font.weight.p} 
                    type={'password'}
                    label={'password:'}
                    labelInline={true}
                    labelFontSize={theme.font.size.p}
                    labelWidth={'40%'}/>
            </UserSecondaryInfoDiv>
            
            <ButtonContainerDiv>
                {editMode?
                    <TextButton
                    text={'go back without saving'}
                    width={'50%'}
                    onClick={()=>{
                        handleInitializeClick();
                        setEditMode(false);
                    }}/>
                :null}
                <Button.GradientButton 
                    text={editMode?'save':'edit'}
                    isDisabled={false}
                    width={'5rem'}
                    textColor={`rgb(${theme.colors.textPrimary})`} 
                    hoveredTextColor={`rgb(${theme.colors.primary})`} 
                    bgColor={`rgb(${theme.colors.primary})`}
                    hoveredBgColor={`rgb(${editMode?theme.colors.resolve:theme.colors.secondary})`}
                    border={`1px solid rgb(${theme.colors.border})`}
                onClick={editMode?
                            ()=>{
                                handleSaveClick();
                                setEditMode(false);
                            }
                        :
                            ()=>{setEditMode(true)}
                        }
                    />
                </ButtonContainerDiv>
        </ContainerDiv>
    )
}

export default MyPage;