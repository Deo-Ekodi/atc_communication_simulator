// pages/atc.js
import { useState } from 'react';
import CommandButton from '../components/CommandButton';
import Layout from '../components/Layout';

const ATC = () => {
    const [message, setMessage] = useState('');

    const commands = [
        "Cleared for takeoff",
        "Maintain altitude",
        "Cleared to land",
        "You are too high",
    ];

    const sendMessage = (command) => {
        setMessage(command);
        const utterance = new SpeechSynthesisUtterance(command);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <Layout>
            <h2>ATC Page</h2>
            <div>
                {commands.map((command, index) => (
                    <CommandButton key={index} command={command} onClick={sendMessage} />
                ))}
            </div>
            <h3>Message Sent: {message}</h3>
        </Layout>
    );
};

export default ATC;
