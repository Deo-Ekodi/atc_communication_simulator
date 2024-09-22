// components/MessageDisplay.js
const MessageDisplay = ({ messages }) => {
    return (
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "ATC" ? 'atc-message' : 'pilot-message'}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
    );
  };
  
  export default MessageDisplay;
  