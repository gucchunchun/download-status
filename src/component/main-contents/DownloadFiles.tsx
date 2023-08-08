import React from 'react';
import DownloadFile from './DownloadFile';
import {File} from '../../App';

interface MyComponentProps {
    files: File[];
}

export default function DownloadFiles(props: MyComponentProps) {
    const containerStyle: React.CSSProperties = {
      overflowY: "scroll",
      width: "90%",
      height: "calc(70% - 4rem)",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
    };
  
    return (
      <div className="container" style={containerStyle}>
        {props.files.map((file, index: number) => (
          <DownloadFile file={file} key={index} isLastChild={index === props.files.length - 1} />
        ))}
      </div>
    );
  }
  