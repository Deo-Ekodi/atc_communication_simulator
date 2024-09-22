// pages/atc-dashboard.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const ATCDashboard = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

// For both ATC and Pilot Dashboards
useEffect(() => {
    socket = io('http://localhost:5000'); // Point to your backend server
    socket.on('message', (msg) => {
      setChat((prev) => [...prev, msg]);
    });
  
    return () => {
      socket.disconnect(); // Clean up socket connection on unmount
    };
  }, []);
  

  const handleSendMessage = () => {
    const speech = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(speech);
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1 p-5 bg-gray-800 text-white shadow-lg">
        <h1 className="text-3xl mb-4">ATC Dashboard</h1>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 rounded border border-gray-600 focus:outline-none"
          placeholder="Type a message"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Send
        </button>
        <div className="mt-5 bg-gray-700 rounded-md p-3 h-64 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-2">Chat Log</h2>
          {chat.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ATCDashboard;
