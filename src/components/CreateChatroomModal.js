// src/components/CreateChatroomModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { db } from '../firebase';
import { ref, push } from 'firebase/database';

const CreateChatroomModal = ({ show, onHide }) => {
  const [roomName, setRoomName] = useState('');

  const handleCreate = async () => {
    if (!roomName.trim()) return;
    try {
      await push(ref(db, 'chatrooms'), { name: roomName });
      setRoomName('');
      onHide();
    } catch (err) {
      console.error('Failed to create chatroom:', err);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Chatroom</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Room Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a name for the chatroom"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateChatroomModal;
