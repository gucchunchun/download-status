import React, {useState, useEffect} from 'react';
import * as Type from './Type';
import { AuthForm } from './component/index';

//TODO: 
//dialog component
//toggle authForm
//refactor component

const App:React.FC = () => {
    const [dataIndex, setDataIndex] = useState<(number|null)>(null);
    const [userData, setUserData] = useState<(Type.User|null)>(null);
    const [files, setFiles] = useState<(Type.File[]|null)>(null);
    const [updatedfiles, setUpdatedFiles] = useState<(Type.File[]|null)>(null);
    const [addFilesMenu, setAddFilesMenu] = useState<(Type.File[]|null)>(null);
    const [used, setUsed] = useState<number>(0);
    const [willUsed, setWillUsed] = useState<number>(0);
  
    //set userData
    function handleLogin(index:number, user: Type.User) {
        setDataIndex(index);
        setUserData(user)
    }
    //once after mounting: get Files data
    useEffect(() =>{
        fetch('/api/files', {
            method: 'GET',
        })
        .then((res)=>res.json())
        .then((data:{files:Type.File[]})=>{
            setFiles(data.files);
        })
        .catch((err)=>{
            console.log(err);
            //dialog is better?
            //https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/dialog_role
            // alert('ERROR: please reload page again')
            setTimeout(()=>{
                window.location.reload();
            },5000);
        });
    }, []);
    //set updated files & addFilesMenu after userData & files are set
    // can not be done in handleLogin because useState is asynchronous
    useEffect(()=> {
        //type guarding
        if ( files === null ) {
            return;
        }
        if ( userData === null ) {
            alert('ERROR: please login or sign up') 
            return;
        }
        const tempUpdatedFiles = files.filter((file)=>
            userData.data.updatedFiles.includes(file.filename)
        );
        const tempAddFilesMenu = files.filter((file)=>
            !userData.data.updatedFiles.includes(file.filename)
        );
        setUpdatedFiles(tempUpdatedFiles);
        setAddFilesMenu(tempAddFilesMenu);
    },[userData])
    //change updatedFiles & addFilesMenu after deleting or updating files
    
    return (
      <>
       <AuthForm handleLogin={handleLogin}/>
      </>
    );
} 
export default App;

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       // Code to be executed on each interval tick
//       setFiles((prevFiles) => {
//         const setdFiles = prevFiles.map((file) => {
//           let setdStatus = file.status;
//           if (typeof file.status === "string") {
//               if(file.status === "waiting" && Math.random() < 0.1){
//                   setdStatus = 0;
//               }
//           }else if  (Math.random() < 0.2){
//               setdStatus = file.status + 1;
//           }else if (Math.random() < 0.5){
//               setdStatus = file.status + 2;
//           }
//           return {
//             ...file,
//             status: (typeof setdStatus=="number"&&setdStatus > 100) ? "up to date" : setdStatus,
//           };
//         });
//         return setdFiles;
//       });
//     }, 100); // Interval time in milliseconds (1000ms = 1 second)