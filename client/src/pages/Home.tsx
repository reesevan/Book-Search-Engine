// src/pages/Home.tsx or App.tsx
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <Button onClick={() => setShowLogin(true)}>Login</Button>
      <Button onClick={() => setShowSignup(true)}>Sign Up</Button>

      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleModalClose={() => setShowLogin(false)} />
        </Modal.Body>
      </Modal>

      <Modal show={showSignup} onHide={() => setShowSignup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupForm handleModalClose={() => setShowSignup(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
