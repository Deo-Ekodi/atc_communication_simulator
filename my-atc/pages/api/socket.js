// pages/api/socket.js
import { Server } from 'socket.io';

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('New client connected');
      
      // Handle incoming messages and broadcast them to all clients
      socket.on('message', (msg) => {
        io.emit('message', msg);  // Broadcast message to all connected clients
      });
    });
  }
  res.end();
}
