import { useState } from 'react';
import { Modal, Tab, Nav } from 'react-bootstrap';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
const AuthModal = ({ show, handleClose }) => {
    const [key, setKey] = useState('login');
    return (<Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{key === 'login' ? 'Login' : 'Sign Up'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container activeKey={key} onSelect={(k) => setKey(k || 'login')}>
          <Nav variant='pills' className='mb-3 justify-content-center'>
            <Nav.Item>
              <Nav.Link eventKey='login'>Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey='login'>
              <LoginForm handleModalClose={handleClose}/>
            </Tab.Pane>
            <Tab.Pane eventKey='signup'>
              <SignupForm handleModalClose={handleClose}/>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>);
};
export default AuthModal;
