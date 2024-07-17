import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSignup } from "../../hooks/useSignup";

const SignUpModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(first, last, email, password);
    if (res) {
      handleClose();
    }
  };

  return (
    <>
      <a href="#" className="nav-link" onClick={handleShow}>
        <button
          className="btn"
          style={{ backgroundColor: '#324b5f', color: '#ffffff', borderColor: '#001f3f' }}
        >
          Sign Up
        </button>
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up to CaRnR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                value={first}
                onChange={(e) => setFirst(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formLastName" className="mt-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                value={last}
                onChange={(e) => setLast(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else (example abc@xyz.com).
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text className="text-muted">
                Should contain one uppercase, one lowercase, one special character, and one number.
              </Form.Text>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-4"
              disabled={isLoading}
              style={{ backgroundColor: '#324b5f', color: '#ffffff', borderColor: '#001f3f' }}
            >
              Create Account
            </Button>
            {error && <div className="error mt-3">{error}</div>}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpModal;
