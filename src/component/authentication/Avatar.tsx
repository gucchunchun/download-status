import React, { useState, useEffect, useRef } from 'react';
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
interface AvatarDivProps {
    editMode: boolean;
}
const AvatarDiv = styled('div')<AvatarDivProps>`
    position: relative;
    width: ${props => props.editMode ? '60%' : '80%'};
    height: 0;
    padding-bottom: ${props => props.editMode ? '60%' : '80%'};
    border: 1px solid rgb(${theme.colors.border});
    border-radius: 50%;
    overflow: hidden;
`
interface AvatarImgProps {
    top: string
    left: string
    scale: string
    translateXY: string
}
const AvatarImgDiv = styled('div')<AvatarImgProps>`
    position: absolute;
    top: ${props => props.top || '50%'};
    left: ${props => props.left || '50%'};
    translate: ${props=>props.translateXY || '-50% -50%'};
    width: fit-content;
    height: fit-content;
    min-width: 100%;
    min-height: 100%;
    transform: scale(${props => props.scale || '1'});
    object-fit: cover;
`;
const AvatarImg = styled('img')`
    object-fit: cover; /* hold original ratio */
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
    const [top, setTop] = useState<string>('50%');
    const [left, setLeft] = useState<string>('50%');
    const [translate, setTranslate] = useState<string>('-50% -50%');
    const [scale, setScale] = useState<string>('1');
    const [imgEdit, setImgEdit] = useState<boolean>(false);
    const [drugged, setDrugged] = useState<boolean>(false);
    const avatarDivRef = useRef<HTMLDivElement|null>(null);
    const avatarImgDivRef = useRef<HTMLDivElement|null>(null);

    function handleImageChange(event:React.ChangeEvent<HTMLInputElement>):void {
        const files = event.target.files;
        if (files&&files.length>=1){
            const file = files[0];
            if (file) {
            props.setSelectedFile(URL.createObjectURL(file));
            }
        }
    }
    function handleImgDragStart(event:React.MouseEvent){
        if(!avatarImgDivRef.current){
            return;
        }
        //img w/h
        const avatarImgDiv = avatarImgDivRef.current.getBoundingClientRect();
        const imgWidth = avatarImgDiv.width;
        const imgHeight = avatarImgDiv.height;
        const imgX = avatarImgDiv.x;
        const imgY = avatarImgDiv.y;

        //start mouse position
        const x = event.clientX;
        const y = event.clientY;

        //calculate percentage
        const transX = Math.round(((x-imgX) / imgWidth * 100));
        const transY = Math.round(((y-imgY) / imgHeight * 100));

        setTranslate(`-${transX}% -${transY}%`);
        setDrugged(true);
    }
    function handleImgDrag(event:React.MouseEvent){
        if(!drugged) {
            return;
        }
        if(!avatarDivRef.current){
            return;
        }
        // parent xy
        const avatarDiv = avatarDivRef.current.getBoundingClientRect();
        const divX = avatarDiv.x;
        const divY = avatarDiv.y;
        // mouse position
        const x = event.clientX;
        const y = event.clientY;

        setTop((y - divY) + 'px');
        setLeft((x - divX) + 'px');
    }
    function handleDragEnd(){
        setTranslate('-50% -50%');
        setTop('50%');
        setLeft('50%');
    }
    
    
    return(
        <AvatarContainer width={props.width} height={props.height}>
            <AvatarDiv editMode={props.editMode} ref={avatarDivRef}>
                <AvatarImgDiv
                    top={top}
                    left={left}
                    translateXY={translate}
                    scale={scale}
                    onDragStart={(e)=>handleImgDragStart(e)}
                    onDrag={(e)=>handleImgDrag(e)}
                    onDragEnd={handleDragEnd}
                    ref={avatarImgDivRef}>
                    <AvatarImg 
                        src={props.avatarPath?props.avatarPath:'/img/user.png'} 
                        alt="user avatar"
                        draggable={true}
                        onDragStart={()=>setDrugged(true)}
                         />
                </AvatarImgDiv>
            </AvatarDiv> 
            {props.editMode?
                <EditContainer>
                    <Button.TextButton 
                        text={'edit'}
                        onClick={()=>setImgEdit((prev)=>!prev)}/>
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