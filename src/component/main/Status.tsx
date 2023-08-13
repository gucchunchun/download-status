import React, { useState, useEffect, useMemo, useRef } from 'react';
import styled from '@emotion/styled'
import * as Type from '../../Type';
import theme from '../../theme';

//TODO: resize!!!!!
interface StatusProps {
    file: Type.File,
    onClick: ()=>void;
}

//  Styled component
interface CompleteDivProps {
    bg?: string,
}
//      https://developer.mozilla.org/en-US/docs/Web/CSS/Scaling_of_SVG_backgrounds
const CompletedDiv = styled('div')<CompleteDivProps>`
    height: 100%;
    aspect-ratio: 1 / 1;
    background-image: url('${props => props.bg || "/img/complete.svg"}');
    background-size: 2.5rem 2.5rem;
    background-position: center;
    background-repeat: no-repeat;
`;

const UpdatingButton = styled('button')`
    height: 100%;
    aspect-ratio: 1 / 1;
`;

//  Canvas Functions
class Doughnut{
    private c: CanvasRenderingContext2D;
    private x: number;
    private y: number;
    private outsideRadius: number;
    private insideRadius: number;
    private angle: number;
    public startAngle: number;

    constructor(c:CanvasRenderingContext2D, x:number, y:number, outsideRadius:number, insideRadius:number, angle:number, startAngle:number=-(Math.PI/2)) {
        this.c = c;
        this.x = x;
        this.y = y;
        this.outsideRadius = outsideRadius;
        this.insideRadius = insideRadius;
        this.angle = angle;
        this.startAngle = startAngle;
    }

    draw() {
        this.c.beginPath();
        this.c.arc(this.x, this.y, this.outsideRadius, 0, Math.PI*2);
        this.c.fillStyle = 'rgb(' + theme.colors.secondary + ')';
        this.c.globalAlpha = 0.3;
        this.c.fill();
        this.c.globalAlpha = 1;
        this.c.beginPath();
        this.c.moveTo(this.x, this.y);
        this.c.arc(this.x, this.y, this.outsideRadius, this.startAngle, this.angle+this.startAngle, false);
        this.c.fillStyle = 'rgb(' + theme.colors.border + ')';
        this.c.fill();
        this.c.beginPath();
        this.c.arc(this.x, this.y, this.insideRadius, 0, Math.PI*2);
        this.c.fillStyle = 'rgb(' + theme.colors.primary + ')';
        this.c.fill();
    }

    changeStartAngle(new_startAngle: number) {
        this.startAngle = new_startAngle;
        this.draw();
    }
} 
class PauseMark {
    private c: CanvasRenderingContext2D;
    private middleX: number;
    private middleY: number;

    constructor(c: CanvasRenderingContext2D, middleX: number, middleY: number) {
        this.c = c;
        this.middleX = middleX;
        this.middleY = middleY;
    }

    draw() {
        this.c.strokeStyle = 'rgb(' + theme.colors.border + ')';
        this.c.lineCap = "round";
        this.c.lineWidth = 6;
        this.c.beginPath();
        this.c.moveTo(this.middleX*7/8, this.middleY*5/6);
        this.c.lineTo(this.middleX*7/8, this.middleY*7/6);
        this.c.stroke();
        this.c.moveTo(this.middleX*9/8, this.middleY*5/6);
        this.c.lineTo(this.middleX*9/8, this.middleY*7/6);
        this.c.stroke();
    }
}   
class ResumeMark {
    private c: CanvasRenderingContext2D;
    private middleX: number;
    private middleY: number;

    constructor(c: CanvasRenderingContext2D, middleX: number, middleY: number) {
        this.c = c;
        this.middleX = middleX;
        this.middleY = middleY;
    }

    draw() {
        this.c.fillStyle = 'rgb(' + theme.colors.border + ')';
        this.c.beginPath();
        this.c.moveTo(this.middleX*7/8, this.middleY*3/4);
        this.c.lineTo(this.middleX*7/8, this.middleY*5/4);
        this.c.lineTo(this.middleX*5/4, this.middleY);
        this.c.fill();
    }
}
const Status:React.FC<StatusProps> = (props) => {
    const [isCompleted,setIsCompleted] = useState(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [waitingAngle, setWaitingAngle] = useState<number>(-Math.PI/2);

    //when it is being uploaded
    const UpdatingButtonRef = useRef< HTMLButtonElement | null >(null);
    const canvasRef = useRef< HTMLCanvasElement | null>(null);
    let statusDoughnut:Doughnut;
    useEffect(() => {
        console.log(props.file.status.status);
        if(props.file.status.status === Type.Status.Completed){
            setIsCompleted(true);
            return;
        }
        const button = UpdatingButtonRef.current;
        const canvas = canvasRef.current;
        if (!button) {
            console.log('UpdatingButtonRef is not found');
            return;
        }
        if (!canvas) {
            console.log('Canvas is not found');
            return;
        }
        //prevent blur lines by doubling canvas size
        canvas.setAttribute('width', (button.clientWidth * 2).toString());
        canvas.setAttribute('height', (button.clientHeight * 2).toString());
        canvas.style.width = button.clientWidth  + 'px';
        canvas.style.height = button.clientHeight  + 'px';

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const c = canvas.getContext('2d');

        if(!c) {
            console.log('Canvas context is not available');
            return;
        }

        if(props.file.status.status === Type.Status.Pausing) {
            let completed = props.file.status.completed;
            const angle = Math.PI*2 * completed/100;
            statusDoughnut = new Doughnut(c, width, height, width*2/3, width/2, angle);
            let statusResumeMark = new ResumeMark(c, width, height);
            statusDoughnut.draw();
            statusResumeMark.draw();
            let animate = () => {
                requestAnimationFrame(animate);
                let animateC = c as CanvasRenderingContext2D;
                animateC.clearRect(0, 0, width*2, height*2);

                statusDoughnut.draw();
                if(isHovered){
                    animateC.globalAlpha = 1;
                }else {
                    animateC.globalAlpha = 0.3;
                }
                statusResumeMark.draw();
            }
            animate();
            return;
        };
        if(props.file.status.status === Type.Status.Waiting) {
            const angle = Math.PI/12;
            statusDoughnut = new Doughnut(c, width, height, width*2/3, width/2, angle, waitingAngle);
            let statusPauseMark = new PauseMark(c, width, height);
            statusDoughnut.draw();
            let animate = () => {
                requestAnimationFrame(animate);
                let animateC = c as CanvasRenderingContext2D;
                animateC.clearRect(0, 0, width*2, height*2);
    
                statusDoughnut.changeStartAngle(statusDoughnut.startAngle + Math.PI/90);
                if (isHovered) {
                    statusPauseMark.draw();
                }
            }
            animate();
            return;
        }
        let completed = props.file.status.completed;
        const angle = Math.PI*2 * completed/100;
        statusDoughnut = new Doughnut(c, width, height, width*2/3, width/2, angle);
        let statusPauseMark = new PauseMark(c, width, height);
        statusDoughnut.draw();
        statusPauseMark.draw();
        let animate = () => {
            requestAnimationFrame(animate);
            let animateC = c as CanvasRenderingContext2D;
            animateC.clearRect(0, 0, width*2, height*2);

            statusDoughnut.draw();

            if (isHovered) {
                statusPauseMark.draw();
            }
        }
        animate();
    },[isHovered, props]);

    return(
        <>
            {isCompleted?
                <CompletedDiv bg={props.file.icon}></CompletedDiv>
                :
                <UpdatingButton 
                    ref={UpdatingButtonRef} 
                    onClick={props.onClick}
                    onMouseEnter={()=>{
                        if (statusDoughnut) {
                            setWaitingAngle(statusDoughnut.startAngle);
                        }
                        setIsHovered(true)
                        }} 
                    onMouseLeave={()=>{
                        if (statusDoughnut) {
                            setWaitingAngle(statusDoughnut.startAngle);
                        }
                        setIsHovered(false)
                        }}>
                    <canvas ref={canvasRef}></canvas>
                </UpdatingButton>
            }
            
        </>
    );
};

export default Status;