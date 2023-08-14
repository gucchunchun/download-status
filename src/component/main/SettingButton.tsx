import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import theme from '../../styles/theme';
import { GradientButton } from '../index';

interface SettingButtonProps{
    deleteOnClick: () => void;
}

const ButtonsDiv = styled('div') `
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
interface SettingOpenButtonProps {
    isHovered: boolean;
}
const SettingOpenButton = styled('button')<SettingOpenButtonProps>`
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: ${props=>props.isHovered? 'scale(0.95)': 'scale(1)'};
    transition: all 0.1s ease-in;
`;
const GearPath = styled('path')<SettingOpenButtonProps>`
    width: 100%;
    height: 100%;
    fill: rgb(${props=>props.isHovered? theme.colors.border : theme.colors.secondary});
    fill-opacity: 1;
`;

const SettingButton:React.FC<SettingButtonProps> = (props) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const SettingOpenButtonRef = useRef<HTMLButtonElement|null>(null);
    const svgRef = useRef<SVGSVGElement|null>(null);
    useEffect(() => {
        const button = SettingOpenButtonRef.current;
        const svg = svgRef.current;
        if(!button) {
            console.log('Button is not found');
            return;
        }
        if(!svg) {
            console.log('SVG is not found');
            return;
        }
        svg.setAttribute('width', (button.clientHeight*0.6).toString());
        svg.setAttribute('height', (button.clientHeight*0.6).toString());
    },[isHovered, isOpen]);

    let autoClose: NodeJS.Timeout;
 
    function handleClick() {
        setIsOpen((prev)=>!prev);
    }
    //when settingOpen 
    function handleDeleteBClick() {
        props.deleteOnClick();
        handleClick();
    }
    function handleMouseLeave() {
        autoClose=setTimeout(() => {
            setIsOpen(false);
        }, 2000);
    }
    function handleMouseEnter() {
        clearTimeout(autoClose);
    }
    
    return(
        <>
            {isOpen?
                <ButtonsDiv onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <GradientButton 
                        text={'delete'}
                        isDisabled={false}
                        bgColor={`rgb(${theme.colors.primary})`}
                        hoveredBgColor={`rgb(${theme.colors.reject})`}
                        textColor={`rgb(${theme.colors.textPrimary})`}
                        hoveredTextColor={`rgb(${theme.colors.primary})`}
                        onClick={handleDeleteBClick}
                        width={'70%'}/>
                    <GradientButton 
                        text={'back'}
                        isDisabled={false}
                        bgColor={`rgb(${theme.colors.primary})`}
                        hoveredBgColor={`rgb(${theme.colors.border})`}
                        textColor={`rgb(${theme.colors.textPrimary})`}
                        hoveredTextColor={`rgb(${theme.colors.primary})`}
                        onClick={handleClick}
                        width={'70%'}/>
                </ButtonsDiv>
                :
                <SettingOpenButton 
                    isHovered={isHovered} 
                    ref={SettingOpenButtonRef}
                    onClick={handleClick} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
                    <svg ref={svgRef} viewBox="0 0 495.625 511.188"xmlns="http://www.w3.org/2000/svg">
                        <GearPath isHovered={isHovered} d="M216.04 531.266c-10.527-2.543-20.56-10.36-25.718-20.036-2.683-5.033-3.829-9.406-6.532-24.925-3.625-20.808-5.566-26-11.84-31.668-5.977-5.4-11.96-7.68-20.156-7.685-6.227-.003-8.823.704-23.5 6.405-16.499 6.409-16.5 6.41-27.02 6.44-9.85.03-10.935-.172-17-3.166-10.958-5.408-13.795-9.23-38.081-51.302-12.224-21.175-23.155-40.525-24.292-43-1.647-3.585-2.072-6.537-2.087-14.52-.018-9.331.204-10.468 3.23-16.5 4.187-8.343 5.562-9.822 21.286-22.898 7.226-6.008 14.404-12.646 15.952-14.752 6.186-8.418 7.364-20.349 2.938-29.763-2.742-5.833-5.693-8.91-19.105-19.917-13.505-11.083-16.02-13.586-19.48-19.4-5.692-9.559-6.84-24.823-2.587-34.417 1.056-2.383 11.92-21.658 24.144-42.833 24.443-42.345 27.667-46.673 38.498-51.678 5.492-2.539 7.157-2.818 16.604-2.79 10.479.031 10.534.044 27 6.406 14.524 5.61 17.339 6.378 23.5 6.41 8.053.043 13.896-2.123 19.865-7.363 6.332-5.56 8.555-11.43 12.158-32.118 2.677-15.365 3.826-19.742 6.505-24.767 4.096-7.685 10.235-13.381 18.793-17.435l6.68-3.165h103l6.679 3.165c8.557 4.054 14.696 9.75 18.793 17.435 2.684 5.036 3.828 9.407 6.542 24.983 3.645 20.928 5.48 25.872 11.671 31.467 6.182 5.584 12.063 7.842 20.314 7.799 6.162-.033 8.976-.8 23.5-6.411 16.474-6.364 16.517-6.374 27.021-6.406 9.85-.03 10.935.173 17 3.166 10.957 5.409 13.794 9.231 38.08 51.302 12.224 21.175 23.09 40.45 24.145 42.833 4.253 9.594 3.105 24.858-2.586 34.418-3.462 5.813-5.976 8.316-19.48 19.4-18.636 15.292-21.55 19.668-21.55 32.35 0 12.68 2.914 17.056 21.55 32.35 13.504 11.082 16.018 13.586 19.48 19.4 5.691 9.559 6.839 24.823 2.586 34.417-1.056 2.383-11.921 21.657-24.145 42.832-24.286 42.072-27.123 45.894-38.08 51.302-6.065 2.994-7.15 3.196-17 3.167-10.52-.032-10.522-.032-27.02-6.44-14.678-5.702-17.274-6.41-23.5-6.406-8.256.004-14.182 2.288-20.315 7.828-6.192 5.594-8.026 10.539-11.672 31.467-2.713 15.576-3.857 19.947-6.541 24.983-4.097 7.685-10.236 13.38-18.793 17.435l-6.68 3.164-49.5.172c-27.225.094-51.19-.237-53.254-.735zm93.613-40.687c.272-.962 1.457-7.825 2.633-15.25 2.548-16.088 4.987-24.41 9.526-32.5 11.19-19.941 29.93-32.489 53.137-35.577 12.056-1.604 21.35-.027 39.845 6.762 8.25 3.028 15.9 5.7 17 5.936 1.706.367 5.012-4.808 22.5-35.22 11.275-19.609 20.62-35.958 20.768-36.331.148-.374-5.186-5.143-11.854-10.599-18.742-15.334-25.422-23.729-30.498-38.324-6.71-19.297-4.883-39.733 5.17-57.827 4.646-8.361 10.938-15.016 25.328-26.79 6.668-5.456 12.002-10.225 11.854-10.599-.147-.374-9.493-16.722-20.768-36.33-17.488-30.413-20.794-35.589-22.5-35.221-1.1.236-8.75 2.907-17 5.936-18.495 6.789-27.79 8.366-39.845 6.762-23.207-3.089-41.947-15.636-53.137-35.578-4.539-8.088-6.978-16.411-9.526-32.5-1.176-7.425-2.36-14.287-2.633-15.25-.46-1.63-3.344-1.75-42.407-1.75h-41.914l-.508 2.25c-.279 1.238-1.423 7.875-2.542 14.75-4.083 25.079-8.461 34.684-21.897 48.04-12.212 12.138-23.65 17.763-40.745 20.038-12.104 1.61-21.37.034-39.846-6.779-8.25-3.042-15.9-5.719-17-5.95-1.703-.356-5.042 4.876-22.5 35.256-11.275 19.62-20.62 35.97-20.766 36.333-.147.363 5.134 5.067 11.734 10.454 6.6 5.386 14.145 12.161 16.766 15.056 23.716 26.187 23.716 66.918 0 93.105-2.621 2.895-10.166 9.67-16.766 15.056-6.6 5.387-11.88 10.097-11.734 10.467.146.37 9.491 16.716 20.766 36.324 17.432 30.316 20.8 35.59 22.5 35.242 1.1-.225 8.75-2.899 17-5.94 18.477-6.813 27.742-8.39 39.846-6.779 23.209 3.089 41.969 15.651 53.13 35.577 4.279 7.639 6.95 16.768 9.512 32.5 1.119 6.875 2.263 13.513 2.542 14.75l.508 2.25h41.914c39.063 0 41.947-.119 42.407-1.75zm-49.859-115.876c-40.347-3.739-74.221-30.578-86.295-68.374-3.456-10.817-4.533-17.947-4.533-30 0-6.325.553-14.2 1.228-17.5 8.43-41.182 38.565-71.31 79.6-79.58 3.3-.666 11.175-1.21 17.5-1.21 6.325 0 14.2.544 17.5 1.21 41.035 8.27 71.17 38.398 79.6 79.58.676 3.3 1.228 11.175 1.228 17.5 0 12.053-1.077 19.183-4.533 30-10.888 34.084-40.774 60.455-75.795 66.881-6.647 1.22-20.005 2.002-25.5 1.493zm24.71-42.357c12.995-4.016 26.09-14.414 33.19-26.355 10.832-18.216 10.864-41.193.084-59.162-16.84-28.07-52.464-37.36-80.145-20.9-27.747 16.498-37.171 52.663-20.821 79.9 8.87 14.777 24.249 25.5 40.829 28.467 7.089 1.269 19.317.381 26.863-1.95z" transform="translate(-19.481 -20.83)"/>
                    </svg>
                </SettingOpenButton>
                }
        </>
    );
}

export default SettingButton;