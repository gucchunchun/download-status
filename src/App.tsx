import React, {useState, useEffect} from 'react';
import * as Type from './Type';
import { AuthForm, Dialog, MainContainer, MenuContainer } from './component/index';


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






const App:React.FC = () => {
    const [dataIndex, setDataIndex] = useState<(number|null)>(null);
    const [userData, setUserData] = useState<(Type.User|null)>(null);
    const [files, setFiles] = useState<Type.File[]>([]);
    const [updatedFiles, setUpdatedFiles] = useState<Type.File[]>([]);
    const [addFiles, setAddFiles] = useState<Type.File[]>([]);
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
    //set updated files & addFiles after userData & files are set
    // can not be done in handleLogin because useState is asynchronous
    useEffect(()=> {
        //type guarding
        if ( userData === null ) {
            return;
        }
        const tempUpdatedFiles = files.filter((file)=>{
            if(userData.data.updatedFiles.includes(file.filename)){
                file.status.status = Type.Status.Completed;
                file.status.completed = 100;
                return true;
            }else {
                return false;
            }
        });
        const tempAddFiles = files.filter((file)=>
            !userData.data.updatedFiles.includes(file.filename)
        );
        setUpdatedFiles(tempUpdatedFiles);
        setAddFiles(tempAddFiles);
    },[files, userData])
    //change updatedFiles & addFiles after deleting or updating files  
    function changeFilesStatus(status:Type.Status, index:number):void {
        setUpdatedFiles((prevFiles)=>{
            return prevFiles.map((file, i) => {
                if(i === index) {
                    return {
                        ...file,
                        status: {
                            ...file.status,
                            status: status === Type.Status.Pausing ? Type.Status.Updating : Type.Status.Pausing
                        }
                    }
                }
                return file;
            });
        });
    }
    function deleteUpdatedFile(index:number):void {
        setUpdatedFiles((prevFiles)=>{
            const deletedFile = prevFiles[index];
            setAddFiles((prevAddFiles)=>{
                return [...prevAddFiles, deletedFile];
            });
            return prevFiles.filter((file, i)=>i !== index);
        })
    }
    function addUpdateFile(index:number):void {
        setAddFiles((prevAddFiles)=>{
            const addFile = prevAddFiles[index];
            setUpdatedFiles((prevFiles)=>{
                return [...prevFiles, addFile];
            });
            return prevAddFiles.filter((file, i)=>i !== index);
        });
    }
    //used, willUsed
    useEffect(()=>{
        let tempUsed:number = 0;
        let tempWillUsed:number = 0;
        updatedFiles.forEach((file)=>{
            if (file.status.status === Type.Status.Completed) {
                tempUsed += file.size;
            }
            tempWillUsed += file.size;
        })
        setUsed(tempUsed);
        setWillUsed(tempWillUsed);
    },[updatedFiles])
    //onClick
    function handleMenuOpenClick():void {
        setIsMenuOpen((prev)=>!prev);
    }
    return (
        <>
        <MainContainer 
            files={updatedFiles} 
            used={used} 
            menuOpenOnClick={handleMenuOpenClick}
            statusOnClick={changeFilesStatus}
            deleteOnClick={deleteUpdatedFile}/>
        {isMenuOpen?
            <MenuContainer 
                files={addFiles}
                used={willUsed} 
                menuCloseOnClick={handleMenuOpenClick} 
                updateOnClick={addUpdateFile} />
        :
            null
        }
        <Dialog isDisabled={userData===null?false: true}>
            <AuthForm handleLogin={handleLogin}/>
        </Dialog>
      </>
    );
} 
export default App;

{/* <Dialog isDisabled={userData===null?false:true}></Dialog> */}

