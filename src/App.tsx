import React, {useState} from 'react';
import { CloudButton } from './component/cloudButton';
import MainContainer from './component/mainContainer';

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