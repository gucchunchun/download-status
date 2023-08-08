import React, {useState, useEffect} from 'react';
import { CloudButton } from './component/CloudButton';
import MainContainer from './component/MainContainer';
import MenuContainer from './component/MenuContainer';


export interface File {
    name: string;
    status: (number|string);
    size: number;
    icon?:Icons;
}
const file1:File = {name: 'file1', status:"up to date", size: 200}
const file2:File = {name: 'file2', status:30,size:300}
const test:File[] = [
    file1,
    file2,
];

export enum Icons {
    slack = "/img/slack.png",
    facebook = "/img/facebook.png",
    instagram = "/img/instagram.png",
    discord = "/img/discord.png",
    x = "/img/x.png",
}
export interface MenuFile extends File {
    icon:Icons;
}
let FilesMenu =  [
    {name: 'slack', status:"waiting", size:100, icon:Icons.slack},
    {name: 'facebook', status:"waiting", size:200, icon:Icons.facebook},
    {name: 'instagram', status:"waiting", size:150, icon:Icons.instagram},
    {name: 'discord', status:"waiting", size:300, icon:Icons.discord},
    {name: 'x', status:"waiting", size:600, icon:Icons.x},
]

export default function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [menu, updateMenu] = useState<MenuFile[]>(FilesMenu);
    const [isMenuOpen, updateIsMenuOpen] = useState<boolean>(false);
    const [files, updateFiles] = useState<File[]>(test);
    const [used, updateUsed] = useState<number>(0);
  
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
        
    },[files])
    function handleButtonClick() {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
    function handleMenuButtonClick():void {
        updateIsMenuOpen((prev)=>{
            return !prev;
        });
    }
    function handleMenuClick(installFiles:MenuFile[]):void {
        updateMenu((prev) => {
            const new_menu = prev.filter((menu) => !installFiles.includes(menu));
            return new_menu;
        });
        updateFiles((prev)=>{
            installFiles.forEach((file)=>{
                prev.push(file);
            })
            return prev;
        });
    }
    function handleCrossClick(installFiles:MenuFile[]):void {
        handleMenuButtonClick();

    }
    return (
      <React.StrictMode>
        <CloudButton onClick={handleButtonClick} />
        <MainContainer isOpen={isOpen} menuOnClick={handleMenuButtonClick} isMenuOpen={isMenuOpen} files={files} used={used}/>
        {isMenuOpen?<MenuContainer  menuList={menu} used={used} menuOnClick={handleMenuClick} crossOnClick={handleMenuButtonClick} isMenuOpen={isMenuOpen} />:null}
      </React.StrictMode>
    );
  } 