// src/components/ChatroomList.js
import React, { useEffect, useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { db } from '../firebase';
import { ref, onValue, remove } from 'firebase/database';

const ChatroomList = ({ setSelectedRoom }) => {
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    const chatroomRef = ref(db, 'chatrooms'); // change to 'chatrooms'

    const unsubscribe = onValue(chatroomRef, (snapshot) => {
      const data = snapshot.val();
      const roomArray = data
        ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
        : [];
      setChatrooms(roomArray);
    });

    return () => unsubscribe(); // clean up listener on unmount
  }, []);

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
