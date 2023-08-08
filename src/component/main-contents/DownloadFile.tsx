import React, {useState, useEffect} from 'react';
import SettingButton from "./SettingButton";
import Status from "./Status";
import {File, MenuFile} from '../../App';

interface MyComponentProps{
    file: File;
    key: number;
    isLastChild: boolean;
    statusOnClick: any;
    deleteFile: (file: MenuFile | File) => void;
}
export default function DownloadFile(props: MyComponentProps) {
    function handleStatusButtonClick() {
        props.statusOnClick(props.file);
    }
    const containerStyle: React.CSSProperties = {
      width: "100%",
      height: "3rem",
      padding: "0.5rem 0",
      borderBottom: props.isLastChild ? "none" : "1px solid #94A3B8",
      boxSizing: "content-box",
    };
    const textStyle: React.CSSProperties = {
      width: "calc(100% - 8rem)",
      height: "100%",
      padding: "0 1rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    };
  
    return (
      <div className="containerRow" style={containerStyle}>
        <Status width="3rem" height="3rem" status={props.file.status} onClick={handleStatusButtonClick}/>
        <div style={textStyle}>
          <h3>{props.file.name}</h3>
          <p>
            {typeof props.file.status === "string"
              ? props.file.status
              : props.file.status + "%"}
          </p>
        </div>
        <SettingButton deleteFile={()=>props.deleteFile(props.file)}/>
      </div>
    );
  }
  
