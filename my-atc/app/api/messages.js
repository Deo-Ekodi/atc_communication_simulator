// pages/api/message.js

import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

let messages = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(messages);
  } else if (req.method === 'POST') {
    const { message } = req.body;
    messages.push(message);

    // Trigger the Pusher event
    pusher.trigger('chat', 'message', {
      message,
    });

    res.status(200).json({ message });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
