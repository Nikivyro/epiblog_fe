import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { updateUser } from '../reducers/userSlice'; // Importa updateUser
import PostsByUser from '../components/Users/PostsByUser';
import EditUser from '../components/Users/EditUser';

export default function UserPage() {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    // Recupera il token dell'utente dal localStorage
    const loggedInUserToken = localStorage.getItem('loggedInUser');

    if (loggedInUserToken) {
      try {
        const decodedToken = jwtDecode(loggedInUserToken);
        dispatch(updateUser(decodedToken)); // Utilizza updateUser per impostare i dati dell'utente in Redux
      } catch (error) {
        console.error('Errore nel decoding del token:', error);
      }
    }
  }, [dispatch]);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Link to="/">Vai alla Home</Link>
          {userData && (
            <div className='border'>
              <h2>Dati dell'utente:</h2>
              <p>Nome: {userData.firstName}</p>
              <p>Email: {userData.email}</p>
              <img src={userData.avatar} className='img-fluid w-25' alt={userData.firstName}/>
              <p>Data di nascita: {userData.birthDate}</p>
              <p>Ruolo: {userData.role}</p>
              <p>ID: {userData.id}</p>
              <button onClick={() => setIsEditing(true)}>Modifica Profilo</button>
            </div>
          )}
        </Col>
        <Col xs={12}>
        {userData && isEditing && (
          <div className='border'>
            <EditUser userData={userData} userId={userData.id} />
          </div>
        )}
        </Col>
      </Row>
    </Container>
  );
}
