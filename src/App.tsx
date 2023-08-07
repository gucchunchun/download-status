import React, {useState} from 'react';
import { CloudButton } from './component/CloudButton';
import MainContainer from './component/MainContainer';

export default function App() {
    const [isOpen, setIsOpen] = useState(false);
    function handleClick() {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  
    return (
      <React.StrictMode>
        <CloudButton onClick={handleClick} />
        <MainContainer isOpen={isOpen} />
      </React.StrictMode>
    );
  } 