import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat/Chat';
import Home from './pages/Home/Home'
import './App.css'


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Chat' element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
