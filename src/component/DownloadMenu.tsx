import React from 'react';

interface File {
    name: string;
    status: (number|string);
    size: number;
}
interface MyComponentProps {
    files: File[],
    onClick: React.MouseEvent,
}
export default function DownloadMenu(props:MyComponentProps) {
    const containerStyle: React.CSSProperties = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    }
    return(
        <div style={containerStyle} className='container'>

        </div>
    );
}