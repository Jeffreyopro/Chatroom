// src/components/NavbarComponent.js
import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';

const NavbarComponent = ({ onCreate, handleLogout }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid className="d-flex justify-content-between">
        <Navbar.Brand>🔥 ChatRoom App</Navbar.Brand>
        <div className="d-flex gap-2">
          <Button variant="outline-light" onClick={onCreate}>
            + Create Chatroom
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
