// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000", // Replace with your Next.js app URL
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    }
  });
  

app.use(cors());
app.use(express.json());

let atcCount = 0;
const maxATCs = 5; // Limit number of ATC users
const atcUsers = new Set(); // Store ATC usernames

// Login endpoint
app.post('/login', (req, res) => {
  const { username, role } = req.body;

  if (role === 'atc') {
    if (atcCount < maxATCs) {
      atcCount++;
      atcUsers.add(username);
      res.status(200).send('ATC logged in');
    } else {
      return res.status(400).send('Maximum ATC users reached');
    }
  } else if (role === 'pilot') {
    res.status(200).send('Pilot logged in');
  } else {
    res.status(400).send('Invalid role');
  }
});

// Socket.io connection
io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    io.emit('message', msg); // Broadcast message to all clients
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
