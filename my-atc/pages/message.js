// pages/api/message.js
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    
    // Trigger Pusher event
    await pusher.trigger('chat-channel', 'message', { message });
    
    res.status(200).json({ status: 'Message sent' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
