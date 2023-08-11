import React, {useState, useEffect} from 'react';
import * as Type from './Type';

export default function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [menu, updateMenu] = useState<Type.File[]>(FilesMenu);
    const [isMenuOpen, updateIsMenuOpen] = useState<boolean>(false);
    const [files, updateFiles] = useState<File[]>(test);
    const [used, updateUsed] = useState<number>(0);
    const [willbeused, updateWillbeUsed] = useState<number>(0);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        // Code to be executed on each interval tick
        updateFiles((prevFiles) => {
          const updatedFiles = prevFiles.map((file) => {
            let updatedStatus = file.status;
            if (typeof file.status === "string") {
                if(file.status === "waiting" && Math.random() < 0.1){
                    updatedStatus = 0;
                }
            }else if  (Math.random() < 0.2){
                updatedStatus = file.status + 1;
            }else if (Math.random() < 0.5){
                updatedStatus = file.status + 2;
            }
            return {
              ...file,
              status: (typeof updatedStatus=="number"&&updatedStatus > 100) ? "up to date" : updatedStatus,
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
        updateWillbeUsed(()=>{
            let new_willbeused:number=0;
            files.forEach((file) =>{
                new_willbeused += file.size;
            });
            return new_willbeused;
        });
    },[files])
    function handleButtonClick() {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
    function handleMenuButtonClick():void {
        updateIsMenuOpen((prev)=>{
            return !prev;
        });
    }
    function handleMenuClick(installFile:MenuFile):void {
        updateMenu((prev) => {
            prev.splice(prev.indexOf(installFile),1);
            return prev;
        });
        updateFiles((prev)=>{
            prev.push(installFile);
            return prev;
        });
    }
    function handleStatusClick(clickedFile:(MenuFile|File)):void {
        updateFiles((prev) => {
            prev.forEach((file)=>{
                if(file===clickedFile){
                    if(typeof file.status==="number"){
                        file.status="resume download from "+ file.status + "%";
                    }else if(file.status.includes("resume download from ")){
                        file.status=Number(file.status.slice(0, -1).replace("resume download from ", ""))
                    }
                }
            })
            return prev;
        });
    }
    function deleteFile(file:(MenuFile|File)):void {
        if("icon" in file){
            updateMenu((prev)=>[...prev, file as MenuFile]);
        }
        updateFiles((prev) => {
            const new_files = prev.filter((prefile)=>prefile!==file);
            return new_files
        });
    }
    return (
      <React.StrictMode>
        <CloudButton onClick={handleButtonClick} />
        <MainContainer isOpen={isOpen} menuOnClick={handleMenuButtonClick} statusOnClick={handleStatusClick} deleteFile={deleteFile} isMenuOpen={isMenuOpen} files={files} used={used}/>
        <MenuContainer  menuList={menu} used={willbeused} menuOnClick={handleMenuClick} crossOnClick={handleMenuButtonClick} isMenuOpen={isMenuOpen} />
      </React.StrictMode>
    );
  } 