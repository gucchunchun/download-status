import React, {useState, useEffect} from 'react';
import * as Type from './Type';

const App:React.FC = () => {
    const [dataIndex, setDataIndex] = useState<(number|null)>(null);
    const [userData, setUserData] = useState<(Type.User|null)>(null);
    const [files, setFiles] = useState<(Type.File[]|null)>(null);
    const [menu, setMenu] = useState<(Type.File[]|null)>(null);
    const [used, setUsed] = useState<number>(0);
    const [willUsed, setWillUsed] = useState<number>(0);
  
    //set userData
    function handleLogin(index:number, user: Type.User) {
        setDataIndex(index);
        setUserData(user);
    }
    //once after mounting
    useEffect(() =>{
        fetch('/api/files', {
            method: 'GET',
        })
        .then((res)=>res.json())
        .then((fileData:Type.File[])=>{
            setFiles(fileData);
        })
        .catch((err)=>{
            console.log(err);
            alert('ERROR: please reload page again')
        });
    }, []);
    
    return (
      <>
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