// src/components/ChatroomList.js
import React, { useEffect, useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { db } from '../firebase';
import { ref, onValue, remove } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const ChatroomList = ({ setSelectedRoom }) => {
  const [chatrooms, setChatrooms] = useState([]);
  const [user] = useAuthState(auth); // Add this

  useEffect(() => {
    const chatroomRef = ref(db, 'chatrooms');
    const unsubscribe = onValue(chatroomRef, (snapshot) => {
      const data = snapshot.val();
      const roomArray = data
        ? Object.entries(data)
            .map(([id, value]) => ({ id, ...value }))
            .filter((room) => room.members?.includes(user?.uid)) // <--- only show joined
        : [];
      setChatrooms(roomArray);
    });

    return () => unsubscribe();
  }, [user]);
  
  const handleDelete = (roomId) => {
    remove(ref(db, `chatrooms/${roomId}`)); // change to 'chatrooms'
  };

  return (
    <div>
      <h5>Chatrooms</h5>
      <ListGroup>
        {chatrooms.map((room) => (
          <ListGroup.Item
            key={room.id}
            className="d-flex justify-content-between align-items-center"
          >
            <span
              onClick={() => setSelectedRoom(room)}
              style={{ cursor: 'pointer' }}
            >
              {room.name}
            </span>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleDelete(room.id)}
            >
              Delete
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ChatroomList;
