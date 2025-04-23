// src/components/Chatroom.js
import React, { useEffect, useState, useRef } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { db } from '../firebase';
import { ref, push, onValue } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Chatroom = ({ room }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user] = useAuthState(auth);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!room || !room.id) return;

    const messagesRef = ref(db, `messages/${room.id}`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messageArray = data
        ? Object.entries(data).map(([id, msg]) => ({
            id,
            ...msg,
          }))
        : [];

      // Find the latest message (the last one)
      const latestMessage = messageArray[messageArray.length - 1];

      // Trigger notification if it's from someone else
      if (
        latestMessage &&
        latestMessage.sender !== user?.uid &&
        Notification.permission === 'granted'
      ) {
        new Notification(`Message from ${latestMessage.senderEmail}`, {
          body: latestMessage.text,
        });
      }

      setMessages(messageArray);
    });


    return () => unsubscribe();
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || !room.id) return;

    const newMessage = {
      text: message.trim(),
      sender: user.uid,
      senderEmail: user.email,
      timestamp: Date.now(),
    };

    await push(ref(db, `messages/${room.id}`), newMessage);
    setMessage('');
  };

  if (!room) {
    return (
      <Card className="p-4">
        <h5>Select a chatroom to start chatting 👈</h5>
      </Card>
    );
  }

  if (!room.members || !room.members.includes(user.uid)) {
    return (
      <Card className="p-4">
        <h5>You are not a member of this private chatroom 🚫</h5>
      </Card>
    );
  }

  return (
    <Card className="p-3" style={{ height: '500px', overflowY: 'auto' }}>
      <h4>Room: {room.name}</h4>
      <div
        className="mb-3"
        style={{
          minHeight: '300px',
          maxHeight: '350px',
          overflowY: 'auto',
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '5px',
        }}
      >
        {messages.length === 0 ? (
          <p><em>No messages yet.</em></p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} style={{ marginBottom: '0.75rem' }}>
              <strong>{msg.senderEmail}</strong>
              <div>{msg.text}</div>
              <small className="text-muted">
                {new Date(msg.timestamp).toLocaleString()}
              </small>
              <hr />
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
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
