// pages/pilot-dashboard.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const PilotDashboard = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Initialize socket connection
    socket = io();
    socket.on('message', (msg) => {
      setChat((prev) => [...prev, msg]);
    });
  }, []);

  // Handle text-to-speech (for the pilot sending a message)
  const handleSendMessage = () => {
    const speech = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(speech); // Speak the message
    socket.emit('message', message); // Emit the message via socket
    setMessage(''); // Clear input
  };

  // Start listening for speech using the Web Speech API
  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; // Get the recognized speech
      socket.emit('message', transcript); // Emit recognized speech as a message
    };
    recognition.start(); // Start the speech recognition process
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-1 p-5 bg-gray-700 text-white shadow-lg">
        <h1 className="text-3xl mb-4">Pilot Dashboard</h1>
        
        <button
          onClick={startListening}
          className="w-full p-2 bg-green-500 rounded hover:bg-green-600 mb-4"
        >
          Start Listening
        </button>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 w-full rounded border border-gray-600 focus:outline-none mb-4"
          placeholder="Type a message"
        />
        
        <button
          onClick={handleSendMessage}
          className="w-full p-2 bg-blue-500 rounded hover:bg-blue-600"
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

export default PilotDashboard;
