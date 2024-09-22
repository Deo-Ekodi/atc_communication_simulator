// pages/pilot.js
import { useState } from 'react';
import CommandButton from '../components/CommandButton';
import Layout from '../components/Layout';

const Pilot = () => {
    const [message, setMessage] = useState('');

    const commands = [
        "Ready for takeoff",
        "Requesting landing clearance",
        "Holding position",
        "Climbing to altitude",
    ];

    const sendMessage = (command) => {
        setMessage(command);
        const utterance = new SpeechSynthesisUtterance(command);
        window.speechSynthesis.speak(utterance);
    };

    return (
        <Layout>
            <h2>Pilot Page</h2>
            <div>
                {commands.map((command, index) => (
                    <CommandButton key={index} command={command} onClick={sendMessage} />
                ))}
            </div>
            <h3>Message Sent: {message}</h3>
        </Layout>
    );
};

export default Pilot;
