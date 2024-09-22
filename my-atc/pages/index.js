// pages/index.js
import { useEffect, useState } from 'react';
import MessageInput from '../components/MessageInput';
import MessageDisplay from '../components/MessageDisplay';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [role, setRole] = useState('Pilot'); // Change to 'ATC' for ATC role

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch('/api/message');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
    

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (content) => {
    await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sender: role, content }),
    });
    const updatedMessages = await (await fetch('/api/message')).json();
    setMessages(updatedMessages);
  };

  return (
    <div>
      <h1>Airport Communication Simulation</h1>
      <MessageDisplay messages={messages} />
      <MessageInput role={role} onSend={handleSend} />
    </div>
  );
}
