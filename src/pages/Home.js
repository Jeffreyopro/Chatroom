// src/pages/Home.js
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NavbarComponent from '../components/NavbarComponent';
import ChatroomList from '../components/ChatroomList';
import Chatroom from '../components/Chatroom';
import CreateChatroomModal from '../components/CreateChatroomModal';
import { auth } from '../firebase';

const Home = ({ user }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <>
      <NavbarComponent onCreate={() => setShowCreateModal(true)} handleLogout={handleLogout} />
      <Container fluid className="mt-4">
        <Row>
          <Col md={4} xs={12} className="mb-3">
            <ChatroomList setSelectedRoom={setSelectedRoom} />
          </Col>
          <Col md={8} xs={12}>
            <Chatroom room={selectedRoom} />
          </Col>
        </Row>
      </Container>
      <CreateChatroomModal show={showCreateModal} onHide={() => setShowCreateModal(false)} />
    </>
  );
};

export default Home;
