import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function Login() {
  const [loginData, setLoginData] = useState({});
  const [login, setLogin] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_URL_ENDPOINT}/login`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(loginData)
      });
      const data = await response.json();

      if (data.token) {
        localStorage.setItem('loggedInUser', JSON.stringify(data.token));
        navigate('/me');
      }

      setLogin(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="bg-light">
      <Row className="justify-content-center min-vh-100 align-items-center">
        <Col xs={12} md={6}>
          <h1 className="mt-4">Login su Epiblog</h1>
          <Form onSubmit={loginSubmit} className="mt-4">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                required
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                required
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary">Login</Button>
          </Form>
          <div className="mt-3">
            Non sei ancora registrato? <Link to='/register'>Registrati</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
