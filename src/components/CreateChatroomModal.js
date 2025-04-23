// src/components/CreateChatroomModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { db } from '../firebase';
import { push, ref, get } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const CreateChatroomModal = ({ show, onHide }) => {
  const [roomName, setRoomName] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await get(ref(db, 'users'));
      const data = snapshot.val();
      const userList = data
        ? Object.entries(data).map(([uid, info]) => ({
            uid,
            email: info.email || '',
            displayName: info.displayName || '',
          }))
        : [];
      setUsers(userList.filter((u) => u.uid !== user?.uid)); // exclude self
    };

    if (show) fetchUsers();
  }, [show, user]);

  const handleCreate = async () => {
    if (!roomName.trim()) return;
  
    const roomData = {
      name: roomName.trim(),
      createdBy: user.uid,
      members: [user.uid, ...selectedMembers], // works even if selectedMembers is empty
    };
  
    await push(ref(db, 'chatrooms'), roomData);
    setRoomName('');
    setSelectedMembers([]);
    onHide();
  };
  

  const toggleMember = (uid) => {
    setSelectedMembers((prev) =>
      prev.includes(uid)
        ? prev.filter((id) => id !== uid)
        : [...prev, uid]
    );
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Private Chatroom</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Chatroom Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Select Members</Form.Label>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {users.map((u) => (
                <Form.Check
                  key={u.uid}
                  type="checkbox"
                  label={u.displayName || u.email}
                  checked={selectedMembers.includes(u.uid)}
                  onChange={() => toggleMember(u.uid)}
                />
              ))}
            </div>
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
