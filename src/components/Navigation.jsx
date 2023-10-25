import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Form, Dropdown } from 'react-bootstrap';
import { clearUser } from '../reducers/userSlice';
import { updateInputValue } from '../reducers/inputReducer';
import ReactLogo from '../logo.svg';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  
  const handleSearch = () => {
    // Esegui l'azione di aggiornamento del valore di ricerca nel tuo reducer
    dispatch(updateInputValue(searchInput));
    // Qui puoi eventualmente effettuare il redirect a una pagina di risultati di ricerca
  };
  
  const username = currentUser.firstName;
  const avatar = currentUser.avatar;

  const handleLogout = () => {
    // Esegui l'azione di logout (nel tuo caso, chiama clearUser).
    dispatch(clearUser());
    localStorage.removeItem('loggedInUser');
    navigate('/login')
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand><Link to='/' className="text-decoration-none"><img src={ReactLogo} width={80} alt='Epiblog'/></Link></Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Cerca su Epiblog"
              aria-label="Search"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <Button variant="outline-success" onClick={handleSearch} className='me-1'>
              Cerca
            </Button>
          </Form>
          <Nav className="ms-auto">
            {currentUser && (
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  <img src={avatar} alt={username} width={20} className='me-1 object-fit-cover rounded'/>
                  <span className='d-none d-md-block'>{username}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item><Link to='/me' className='text-decoration-none text-white'>Profilo</Link></Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
