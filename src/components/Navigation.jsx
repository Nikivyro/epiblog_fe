import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Form } from 'react-bootstrap';

const Navigation = () => {
    const userData = useSelector((state) => state.user); 

    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/me">Profile</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
};

export default Navigation;
