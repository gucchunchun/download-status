import React, {useState, useEffect, useRef } from 'react';
import * as Type from './Type';
import { Global } from '@emotion/react';
import globalStyles from './styles/globalStyles';
import { AuthForm, MainContainer, MenuContainer, FakeUpdateButton } from './component/index';
import { Dialog } from './component/common/index';

const App:React.FC = () => {
    const [dataIndex, setDataIndex] = useState<(number|null)>(null);
    const [userData, setUserData] = useState<(Type.User|null)>(null);
    const [files, setFiles] = useState<Type.File[]>([]);
    const [updatedFiles, setUpdatedFiles] = useState<Type.File[]>([]);
    const [addFiles, setAddFiles] = useState<Type.File[]>([]);
    const [used, setUsed] = useState<number>(0);
    const [willUsed, setWillUsed] = useState<number>(0);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [timeout, setNewTimeout] = useState<(NodeJS.Timeout|1|null)>(null);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(true);
  
    //func to fakery update the file data too cloud
    const newTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(()=> {
        if (timeout === null) {
            return;
            
        }else {
            clearTimeout(timeout);
        }

        const newTimeout = setTimeout(() =>{
            let completedNum:number = 0;
            const new_files:Type.File[] = updatedFiles.map((file)=> {
                let new_status = file.status.status;
                let new_completed = file.status.completed;
                if ( (new_status === '' ) && (Math.random() < 0.2) ) {
                    new_completed += 1;
                }else if ( (new_status === '' ) && (Math.random() < 0.5) ) {
                    new_completed += 2;
                }else if ( (new_status === Type.Status.Waiting as string ) && (Math.random() < 0.1) )  {
                    new_status = Type.Status.Updating;
                }else if ( new_status === Type.Status.Completed ) {
                    completedNum++;
                }
                if (new_completed >= 100) {
                    new_status = Type.Status.Completed;
                    new_completed = 100;
                }
                return {
                    ...file,
                    status: {
                        status: new_status,
                        completed: new_completed
                    }
                }
            })
            if ( completedNum !== updatedFiles.length){
                setUpdatedFiles(new_files);
                setNewTimeout(newTimeout);
            }
        }, 200);
        newTimeoutRef.current = newTimeout;

        return(()=>{
            if (timeout !== null) {
                clearTimeout(timeout);
              }
              if ( newTimeoutRef.current !== null ) {
                  clearTimeout(newTimeoutRef.current);
              }
        });
    },[updatedFiles, timeout]);
    function stop_fakeUpdate() {
        if (timeout !== null) {
          clearTimeout(timeout);
        }
        if ( newTimeoutRef.current !== null ) {
            clearTimeout(newTimeoutRef.current);
        }
        setNewTimeout(null);
    }
    function start_fakeUpdate() {
        setNewTimeout(1)
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

        return(()=>{
            fetch('/api/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userData, dataIndex })
            })
            .then((res)=>{
                if(res.status === 401){
                    return res.json().then((err) =>{
                    throw new Error(err.message)});
                }else {
                    return res.json();
                }})
                .then((data)=>{
                    console.log(data.message);
                })
                .catch((err)=>{
                    console.log(err);
                });
        })
    }, []);
    //set updated files & addFiles after userData & files are set
    // can not be done in handleLogin because useState is asynchronous
    useEffect(()=> {
        //type guarding
        if ( userData === null ) {
            return;
        }
        setIsFormOpen(false);
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

    //set userData
    function handleLogin(index:number, user: Type.User) {
        setDataIndex(index);
        setUserData(user);
    }
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
    },[updatedFiles]);

    //onClick
    function handleMenuOpenClick():void {
        setIsMenuOpen((prev)=>!prev);
    }
    return (
        <>
        <Global styles={globalStyles} />
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
        <FakeUpdateButton startFunc={start_fakeUpdate} stopFunc={stop_fakeUpdate}/>
        <Dialog isDisabled={isFormOpen?false: true}>
            <AuthForm handleLogin={handleLogin}/>
        </Dialog>
      </>
    );
} 
export default App;


