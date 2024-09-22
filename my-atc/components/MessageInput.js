// components/MessageInput.js
import { useState } from 'react';

const MessageInput = ({ role, onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={`${role}, type your message...`}
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
