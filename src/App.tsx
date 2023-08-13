import React, {useState, useEffect} from 'react';
import * as Type from './Type';
import { AuthForm, Dialog, MainContainer, MenuContainer } from './component/index';

//TODO: 
//refactor component
const testFile:Type.File = {filename:'text', size:300, status: {status: Type.Status.Updating, completed:30}}
const testFile2:Type.File = {filename:'text', size:300, status: {status: Type.Status.Waiting, completed:0}}
const testFile3:Type.File = {filename:'text', size:300, status: {status: Type.Status.Pausing, completed:60}}


const App:React.FC = () => {
    const [dataIndex, setDataIndex] = useState<(number|null)>(null);
    const [userData, setUserData] = useState<(Type.User|null)>(null);
    const [files, setFiles] = useState<Type.File[]>([]);
    const [updatedFiles, setUpdatedFiles] = useState<Type.File[]>([]);
    const [addFilesMenu, setAddFilesMenu] = useState<Type.File[]>([]);
    const [used, setUsed] = useState<number>(0);
    const [willUsed, setWillUsed] = useState<number>(0);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
    //set userData
    function handleLogin(index:number, user: Type.User) {
        setDataIndex(index);
        setUserData(user);
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
        console.log(userData===null)
    },[files, userData])
    //change updatedFiles & addFilesMenu after deleting or updating files
    
    function changeFilesStatus(status:Type.Status, index:number):void {
        switch (status) {
            case Type.Status.Pausing:
                setAddFilesMenu((prevFiles)=>{
                    prevFiles.map((file,i)=>{
                        if(i===index){
                            file.status.status=Type.Status.Updating;
                        } 
                        return file;
                    });
                    return prevFiles;
                });
                return;
            default:
                setAddFilesMenu((prevFiles)=>{
                    prevFiles.map((file,i)=>{
                        if(i===index){
                            file.status.status=Type.Status.Pausing;
                        } 
                        return file;
                    });
                    return prevFiles;
                });
                return;
        };
    }
    function deleteUpdatedFile(index:number):void {
        setUpdatedFiles((prevFiles)=>{
            setAddFilesMenu((prevAddFiles)=>{
                prevAddFiles.push(prevFiles[index])
                return prevAddFiles;
            });
            prevFiles.filter((file, i)=>i !== index);
            return prevFiles;
        })
    }
    //onClick
    function handleMenuOpenClick():void {
        setIsMenuOpen((prev)=>!prev);
    }
    return (
        <>
        <Dialog isDisabled={true}>
            <AuthForm handleLogin={handleLogin}/>
        </Dialog>
        <MainContainer 
            files={updatedFiles} 
            used={used} 
            menuOpenOnClick={handleMenuOpenClick}
            statusOnClick={changeFilesStatus}
            deleteOnClick={deleteUpdatedFile}/>
        {isMenuOpen?
            <MenuContainer menuCloseOnClick={handleMenuOpenClick} used={200} files={[testFile, testFile2, testFile3]} />
        :
            null
        }
      </>
    );
} 
export default App;

{/* <Dialog isDisabled={userData===null?false:true}></Dialog> */}

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