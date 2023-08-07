import React, {useState, useEffect} from 'react';
import { Storage, DownloadButton, DownloadFiles, DownloadMenu } from './main-contents/index';

interface MyComponentProps {
    isOpen: boolean;
}
interface File {
    name: string;
    status: (number|string);
    size: number;
}
const file1:File = {name: 'file1', status:"up to date", size: 200}
const file2:File = {name: 'file2', status:30,size:300}
const test:File[] = [
    file1,
    file2,
];

const slack:File = {name: 'slack', status:"Waiting", size:100};
const facebook:File = {name: 'facebook', status:"Waiting", size:200};
const instagram:File = {name: 'instagram', status:"Waiting", size:150};
const discord:File = {name: 'discord', status:"Waiting", size:300};
const x:File = {name: 'x', status:"Waiting", size:600};
let FilesMenu =  [
    slack, facebook, instagram, discord, x
]
export default function MainContainer(props:MyComponentProps) {
    const [files, updateFiles] = useState<File[]>(test);
    const [used, updateUsed] = useState<number>(0);
    const [menuIsOpen, updateMenuIsOpen] = useState(false);
    const [menu, updateMenu] = useState(FilesMenu);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        // Code to be executed on each interval tick
        updateFiles((prevFiles) => {
          const updatedFiles = prevFiles.map((file) => {
            if (typeof file.status === "string") {
              return file;
            }
            let updatedStatus = file.status;
            if (Math.random() < 0.2){
                updatedStatus = file.status + 1;
            }else if (Math.random() < 0.5){
                updatedStatus = file.status + 2;
            }
            return {
              ...file,
              status: updatedStatus > 100 ? "up to date" : updatedStatus,
            };
          });
          return updatedFiles;
        });
      }, 100); // Interval time in milliseconds (1000ms = 1 second)
  
      // Cleanup function to clear the interval when the component unmounts
      return () => {
        clearInterval(intervalId);
      };
    }, []);
    useEffect(()=>{
        updateUsed(()=>{
            let new_used:number=0;
            files.forEach((file) =>{
                if (file.status === "up to date"){
                    new_used += file.size;
                }
            });
            return new_used;
        })
        
    },[files])
    function handleButtonClick():void {
        updateMenuIsOpen((prev)=>{
            return !prev
        });
    }
    function handleMenuClick(event:string):void {
        console.log(event);
    }
    const containerStyle: React.CSSProperties = {
        width: "22rem",
        height: "22rem",
        padding: "1rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "5px",
        boxShadow: "1px 1px 20px rgba(0,0,0,0.1), -1px -1px 20px rgba(0,0,0,0.1)",
        filter: menuIsOpen? "blur(4px)":"blur(0)"
    }
    return (
    <div className={props.isOpen ? 'container' : 'hidden container'} style={containerStyle}>
        <Storage used={used}/>
        <DownloadFiles files={files}/>
        <DownloadButton onClick={handleButtonClick}/>
        <DownloadMenu className={menuIsOpen ? 'container' : 'hidden container'} files={menu} onClick={handleMenuClick}/>
    </div>
    );
}