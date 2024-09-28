import React, { useState } from 'react';
import './Home.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleModeChange = (newMode: boolean) => {
    setIsDarkMode(newMode);
  };

  return (
    <div className={isDarkMode ? 'home-container dark-mode' : 'home-container'}>
      <NavigationBar onModeChange={handleModeChange} isDarkMode={isDarkMode} />
        <header>
      <h1>Chat with Your AI Assistant</h1>
      <p>Quick answers, always available.</p>
      <button className='action-button'><Link to="/Chat">Try It Now</Link></button>
      </header>
    </div>
  );
};

export default Home;
