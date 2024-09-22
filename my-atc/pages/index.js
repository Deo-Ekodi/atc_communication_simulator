// pages/index.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

export default function Home() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Set up socket connection
    socket = io();
    socket.on('message', (msg) => {
      setChat((prev) => [...prev, msg]);
    });
  }, []);

  const handleSendMessage = () => {
    const speech = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(speech);
    socket.emit('message', message);
    setMessage('');
  };

  const startListening = () => {
    const recognition = new webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      socket.emit('message', transcript);
    };
    recognition.start();
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* ATC Dashboard */}
      <div className="flex-1 p-5 bg-gray-800 shadow-lg">
        <h1 className="text-3xl mb-4">ATC Dashboard</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white rounded-r-md"
          >
            Send
          </button>
        </div>

        {/* Message Logs */}
        <div className="chat-log">
          <h2 className="text-lg mb-2">Chat Log</h2>
          {chat.length > 0 ? (
            chat.map((msg, idx) => (
              <p key={idx}>{msg}</p>
            ))
          ) : (
            <p className="no-messages">No messages yet...</p>
          )}
        </div>
      </div>

      {/* Pilot Interface */}
      <div className="flex-1 p-5 bg-gray-700 shadow-lg">
        <h1 className="text-3xl mb-4">Pilot Interface</h1>
        <button
          onClick={startListening}
          className="pilot-button"
        >
          Start Listening
        </button>

        <p className="mt-5 text-lg">Listen to instructions here...</p>
      </div>
    </div>
  );
}
