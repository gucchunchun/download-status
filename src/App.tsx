import React, {useState, useEffect} from 'react';
import * as Type from './Type';

export default function App() {
    const [menu, updateMenu] = useState<Type.File[]>(FilesMenu);
    const [files, updateFiles] = useState<Type.File[]>(test);
    const [used, updateUsed] = useState<number>(0);
    const [willbeused, updateWillbeUsed] = useState<number>(0);
  
    return (
      <>
      </>
    );
  } 

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       // Code to be executed on each interval tick
//       updateFiles((prevFiles) => {
//         const updatedFiles = prevFiles.map((file) => {
//           let updatedStatus = file.status;
//           if (typeof file.status === "string") {
//               if(file.status === "waiting" && Math.random() < 0.1){
//                   updatedStatus = 0;
//               }
//           }else if  (Math.random() < 0.2){
//               updatedStatus = file.status + 1;
//           }else if (Math.random() < 0.5){
//               updatedStatus = file.status + 2;
//           }
//           return {
//             ...file,
//             status: (typeof updatedStatus=="number"&&updatedStatus > 100) ? "up to date" : updatedStatus,
//           };
//         });
//         return updatedFiles;
//       });
//     }, 100); // Interval time in milliseconds (1000ms = 1 second)