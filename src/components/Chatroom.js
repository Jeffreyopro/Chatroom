// src/components/Chatroom.js
import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const Chatroom = ({ room }) => {
  const [message, setMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    // TODO: Send message to Firebase
    console.log(`Sending message to ${room}:`, message);
    setMessage('');
  };

  if (!room) {
    return (
      <Card className="p-4">
        <h5>Select a chatroom to start chatting 👈</h5>
      </Card>
    );
  }

  return (
    <Card className="p-3">
      <h4>Room: {room}</h4>
      <div className="mb-3" style={{ minHeight: '200px', backgroundColor: '#f8f9fa', padding: '1rem' }}>
        {/* TODO: Display messages from Firebase here */}
        <p><em>No messages yet.</em></p>
      </div>
      <Form onSubmit={handleSend}>
        <Form.Group className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" variant="primary">
            Send
          </Button>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default Chatroom;
