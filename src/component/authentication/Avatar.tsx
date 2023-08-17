import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { Button } from '../common/index';

interface AvatarProps {
    avatarPath: (string|null)
    x: string
    y: string
    translate: string
    scale: string
    width: string
    height: string
    editMode: boolean
    change_avatar:(path: string) => void
    setSelectedFile:(path: string) => void
    positionSetter:{
        x:React.Dispatch<React.SetStateAction<string>>,
        y:React.Dispatch<React.SetStateAction<string>>,
        translate:React.Dispatch<React.SetStateAction<string>>,
        scale:React.Dispatch<React.SetStateAction<string>>}
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
    min-width: 105%;
    min-height: 105%;
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
        if(!imgEdit||!avatarImgDivRef.current){
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

        props.positionSetter.translate(`-${transX}% -${transY}%`);
        setDrugged(true);
    }
    function handleImgDrag(event:React.MouseEvent){
        if (!imgEdit||!drugged || !avatarDivRef.current || !avatarImgDivRef.current) {
            return;
          }
        // parent xy
        const avatarDiv = avatarDivRef.current.getBoundingClientRect();
        const divX = avatarDiv.x;
        const divY = avatarDiv.y;
        const divWidth = avatarDiv.width;
        const divHeight = avatarDiv.height;
        // mouse position
        const x = event.clientX;
        const y = event.clientY;
        if(x===0 && y===0){
            return;
        }
        let left = x - divX;
        let top = y - divY;

        //img w/h
        const avatarImgDiv = avatarImgDivRef.current.getBoundingClientRect();
        const imgWidth = avatarImgDiv.width;
        const imgHeight = avatarImgDiv.height;
        const middleX = parseInt(props.translate.split(' ')[0]);
        const middleY = parseInt(props.translate.split(' ')[1]);
        // if(imgWidth * (-middleX) / 100 < left) {
        //     // space on left side
        //     left = imgWidth * (-middleX) / 100 - 1;
        //     console.log('left' + left);
        // }
        // if((imgWidth * (100 - (-middleX)) / 100) < (divX + divWidth - left)){
        //     //space on right side
        //     left = divX + divWidth - (imgWidth * (100 - (-middleX)) / 100) - divX + 1;
        //     console.log('right' + left);
        // }
        // if(imgHeight * (-middleY) / 100 < top) {
        //     //space on top side
        //     top = imgHeight * (-middleY) / 100 - 1;
        //     console.log('top' + top);
        // }
        // if((imgHeight * (100 - (-middleY)) / 100) < (divY + divHeight - top)){
        //     //space on bottom side
        //     top = divY + divHeight - (imgHeight * (100 - (-middleY)) / 100) - divY + 1;
        //     console.log('bottom' + top);
        // }
        
        props.positionSetter.x(left + 'px');
        props.positionSetter.y(top + 'px');
    }
    

    function handleOnDragEnd(event:React.MouseEvent){
        event.preventDefault();
        console.log('dragged');
    }
    function zoom(event:WheelEvent) {
        event.preventDefault();
      
        props.positionSetter.scale((prevScale)=>{
            let new_scale = Number(prevScale) + event.deltaY * -0.01;
            if(new_scale < 1){
                new_scale = 1;
            }
            return new_scale.toString();
        }) 
    }
    
    useEffect(() => {
        const handleWheel = (e:WheelEvent) => {
          e.preventDefault(); // Prevent default behavior
          zoom(e); // Call your custom onWheel handler
        };
    
        // Register the onWheel event listener with passive: false
        if(!avatarImgDivRef.current){
            return;
        }
        const currentImgDiv = avatarImgDivRef.current
        currentImgDiv.addEventListener('wheel', handleWheel, { passive: false });
    
        // Clean up the event listener when the component unmounts
        return () => {
            if(currentImgDiv){
                currentImgDiv.removeEventListener('wheel', handleWheel);
            }
        };
    }, [avatarImgDivRef]);
    
    return(
        <AvatarContainer width={props.width} height={props.height}>
            <AvatarDiv editMode={props.editMode} ref={avatarDivRef}>
                <AvatarImgDiv
                    top={props.y}
                    left={props.x}
                    translateXY={props.translate}
                    scale={props.scale}
                    onDragStart={(e)=>handleImgDragStart(e)}
                    onDrag={(e)=>handleImgDrag(e)}
                    onDragEnd={(e)=>handleOnDragEnd(e)}
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
                        text={imgEdit?'set':'edit'}
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