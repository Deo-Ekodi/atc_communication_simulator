import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://my-atc.vercel.app'); // Update with your deployed URL

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('message', (data) => {
      setChat((prev) => [...prev, data.message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
      <div>
        {chat.map((msg, idx) => (
          <p key={idx}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
