// components/CommandButton.js
const CommandButton = ({ command, onClick }) => {
    return (
        <button onClick={() => onClick(command)}>
            {command}
        </button>
    );
};

export default CommandButton;
