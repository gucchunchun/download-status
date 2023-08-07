import React from 'react';

export default function Storage(props:{used:number}) {
    const containerStyle: React.CSSProperties = {
        width: "90%",
        height: "28%",
        margin: "0.25rem 0",
        backgroundColor: "#F1F5F9",
        borderRadius: "5px",
    }
    const h1Style: React.CSSProperties = {
        width: "100%",
        paddingLeft: "5%"
    }
    const maxMeterStyle: React.CSSProperties = {
        width: "90%",
        height: "5%",
        border: "0.8px solid #94A3B8",
        borderRadius: "5px",
    }
    const usedMeterStyle: React.CSSProperties = {
        width: (props.used/10)+"%",
        height: "100%",
        border: "0.8px solid #94A3B8",
        borderRadius: "5px",
        backgroundColor: "#000",
        transition: "width 0.3s"
    }
    return(
        <div className='container' style={containerStyle}>
            <h3 style={h1Style}>cloud storage</h3>
            <div id="maxMeter" style={maxMeterStyle}>
                <div id="usedMeter" style={usedMeterStyle}></div>
            </div>
            <p>{props.used} MB / 100GB</p>
        </div>
    );
}