import { initSocket } from './message';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    const io = getSocket();
    io.emit("message", { message });
    res.status(200).json({ status: 'Message sent' });
  }
}

// Initialize socket.io with the server (in your server file)
