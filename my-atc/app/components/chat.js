// components/Chat.js

import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data) => {
      setChat((prev) => [...prev, data.message]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const handleSendMessage = async () => {
    if (message.trim()) {
      await fetch('/api/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      setMessage('');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-5 bg-gray-800 text-white">
        <h1 className="text-2xl mb-4">ATC Dashboard</h1>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 text-black"
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage} className="ml-2 p-2 bg-blue-500">
          Send
        </button>

        <div className="mt-5">
          <h2>Chat Log</h2>
          {chat.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
