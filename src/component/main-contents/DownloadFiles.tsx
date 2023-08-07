import React, {useState} from 'react';
import DownloadFile from './DownloadFile';

interface File {
    name: string;
    state: (number|string);
}
const file1:File = {name: 'file1', state:"up to date"}
const file2:File = {name: 'file2', state:0}
const test:File[] = [
    file1,
    file2,
    file1,
    file2,
    file1,
    file2,
    file1,
    file2
];

export default function DownloadFiles() {
    let [files, updateFiles] = useState(test);
    const containerStyle: React.CSSProperties = {
        overflowY: "scroll",
        width: "90%",
        height: "calc(70% - 4rem)",
        flexWrap: "nowrap",
    }
    return(
        <div className='container' style={containerStyle}>
            {files.map((file, index:number) => {return <DownloadFile file={file} key={index} />;})}
        </div>
    );
}