// pages/api/message.js
let messages = [];

const atcResponses = [
  "Cleared for takeoff.",
  "You are cleared to land.",
  "Maintain altitude.",
  "Squawk 1234.",
  "Weather is clear.",
];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { sender, content } = req.body;
    messages.push({ sender, content });

    // Simulate ATC response
    if (sender === "Pilot") {
      const atcMessage = atcResponses[Math.floor(Math.random() * atcResponses.length)];
      messages.push({ sender: "ATC", content: atcMessage });
    }

    res.status(200).json({ success: true });
  } else if (req.method === 'GET') {
    res.status(200).json(messages);
  }
}
