import React, { useState } from 'react';
import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { db } from './firebase';
import { set, ref } from 'firebase/database';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const provider = new GoogleAuthProvider();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await set(ref(db, `users/${user.uid}`), {
        email: user.email,
        displayName: user.displayName || '',
      });
      alert("Account created!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await set(ref(db, `users/${user.uid}`), {
        email: user.email,
        displayName: user.displayName || '',
      });
      alert("Signed in with Google!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100">
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <h3 className="text-center mb-4">Sign In</h3>
          <Form onSubmit={handleSignIn}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-2">
              Sign In with Email
            </Button>

            <Button variant="outline-primary" className="w-100 mb-2" onClick={handleGoogleSignIn}>
              Sign In with Google
            </Button>

            <Button variant="success" className="w-100" onClick={handleSignUp}>
              Sign Up (Email)
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
