import React, { useState, useEffect } from 'react';
import { BsFillSendFill } from "react-icons/bs";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa";
import './Chat.css';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);



  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getCompletion = async (): Promise<void> => {
    if (!input.trim()) return;

    const now = new Date();
    const newMessages = [...messages, { text: input, isUser: true, timestamp: now }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ message: input }),
      headers: { "Content-Type": "application/json" }
    };

    try {
      const response = await fetch('http://localhost:3001/completions', options);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      
      setTimeout(() => {
        setMessages([...newMessages, { text: data.response, isUser: false, timestamp: new Date(data.timestamp) }]);
        setIsLoading(false);
      }, 2000);

    } catch (error) {
      console.error('Error fetching completion:', error);
      setTimeout(() => {
        setMessages([...newMessages, { text: "Sorry, there was an error processing your request with Gemini AI.", isUser: false, timestamp: now }]);
        setIsLoading(false);
      }, 2000);
    }
  };

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setShowToast(true);
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
            <span className="message-label">{msg.isUser ? 'User:' : 'Gemini AI:'}</span>
            <FaRegCopy 
              className="icons"
              onClick={() => copyToClipboard(msg.text)}
            />
            <AiOutlineLike className="icons" />
            <AiOutlineDislike className="icons" />
           
            <div className="message-content">
              <span>{msg.text}</span>
            </div>
            <div className="timestamp">{formatTimestamp(msg.timestamp)}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot loading">
            <span className="message-label">Gemini AI:</span>
            <div className="message-content">
            <div className="lds-dual-ring"></div>
            </div>
          </div>
        )}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          className='chat-input'
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && getCompletion()}
          placeholder="Type a message..."
        />
        <button className="send-button" onClick={getCompletion}>
          <BsFillSendFill />
        </button>
      </div>
      {showToast && (
        <div className="toast">
          Text copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default Chat;