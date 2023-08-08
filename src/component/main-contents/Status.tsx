import React, {useState, useEffect, useRef} from 'react';

interface MyComponentProps{
    width:string,
    height:string,
    status:(number|string)
}
export default function Canvas(props:MyComponentProps) {
    const {status=0} = props;
    const [isHovered, updateIsHovered] = useState<boolean>(false);
    function handleHover() {
        updateIsHovered((prev)=>{return !prev});
    }
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const button = buttonRef.current;
        if (!canvas){
            console.log("Canvas is not found");
            return
        }
        if (!button){
            console.log("Button is not found");
            return
        }
        //width, height setting
        //prevent blur lines by doble sizing canvas
        canvas.setAttribute("width", (button.clientWidth*2).toString());
        canvas.setAttribute("height", (button.clientHeight*2).toString());
        canvas.style.width = button.clientWidth.toString() + "px";
        canvas.style.height = button.clientHeight.toString() + "px";

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const c = canvas.getContext("2d");
        if (!c) {
            console.log("Canvas context is not found");
            return
        }
        if(props.status === "up to date"){
            //complete icon
            c.beginPath();
            c.arc(width, height, width*2/3, 0, Math.PI*2);
            c.fillStyle = "#69A823";
            c.fill();
            c.beginPath();
            c.moveTo(width*3/4, height);
            c.lineTo(width*7/8, height*5/4);
            c.lineTo(width*5/4, height*3/4);
            c.strokeStyle = "#F1F5F9";
            c.lineCap = "round";
            c.lineWidth = 6;
            c.stroke();
        }else{
            let status = props.status;
            if(typeof status == "string"){
                status = 0;
            }
            const radian:number = Math.PI*2 * status/100;
            c.beginPath();
            c.arc(width, height, width*2/3, 0, Math.PI*2);
            c.fillStyle = "#94A3B8";
            c.globalAlpha = 0.3;
            c.fill();

            c.globalAlpha = 1;
            c.beginPath();
            c.moveTo(width, height);
            c.arc(width, height, width*2/3, -Math.PI/2, radian-Math.PI/2, false);
            c.fillStyle = "#000";
            c.fill();

            c.beginPath();
            c.arc(width, height, width/2, 0, Math.PI*2);
            c.fillStyle = "#F1F5F9";
            c.fill();

            if(isHovered) {
                c.strokeStyle = "#94A3B8";
                c.lineCap = "round";
                c.lineWidth = 4;
                c.beginPath();
                c.moveTo(width*7/8, height*3/4);
                c.lineTo(width*7/8, height*5/4);
                c.stroke();
                c.moveTo(width*9/8, height*3/4);
                c.lineTo(width*9/8, height*5/4);
                c.stroke();
            }
        }
    },[props]);
    const canvasButtonStyle: React.CSSProperties = {
        width: props.width,
        height: props.height,
        margin: "0 0.5rem 0 1rem",
        padding: 0,
        border: "none",
        transform: (isHovered&&typeof props.status==="number") ? "scale(0.95)": "scale(1)"
    }

    return(
        <button style={canvasButtonStyle} ref={buttonRef} onMouseEnter={handleHover} onMouseLeave={handleHover}>
            <canvas ref={canvasRef}></canvas>
        </button>
    );
}