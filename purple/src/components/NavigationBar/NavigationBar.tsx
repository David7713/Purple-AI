import React, { useState } from 'react';
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import './NavigationBar.css'

interface NavigationBarProps {
  onModeChange: (isDarkMode: boolean) => void;
  isDarkMode: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ onModeChange, isDarkMode }) => {
  const toggleMode = () => {
    const newMode = !isDarkMode;
    onModeChange(newMode);
  };

  return (
    <nav>
      <div className='logo-section'>Purple AI</div>
      <button
       
        onClick={toggleMode} 
        style={{ 
          background: 'transparent', 
          border: 'none', 
          cursor: 'pointer', 
          fontSize: '40px',
          color: isDarkMode ? '#73c2fb' : '#FDEE00' 
        }}
      >
        {isDarkMode ? <FaMoon /> : <IoSunny />}
      </button>
    </nav>
  );
};

export default NavigationBar;
