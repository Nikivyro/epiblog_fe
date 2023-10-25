import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PostsByUser from '../components/Users/PostsByUser';
import EditUser from '../components/Users/EditUser';
import { updateUser } from '../reducers/userSlice';
import axios from 'axios';

export default function UserPage() {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const closeEditUser = () => {
    setIsEditing(false);
  };

  // Esegui il fetch dei dati dell'utente all'avvio della pagina o quando necessario
  const fetchUserData = async () => {
    try {
      // Esegui la tua chiamata API per ottenere i dati dell'utente
      const response = await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/users/${userData.id}`); // Sostituisci con l'URL corretto
      const updatedUserData = response.data.payload; // Supponiamo che la risposta sia un oggetto con i dati dell'utente aggiornati
      dispatch(updateUser(updatedUserData));
    } catch (error) {
      console.error('Errore durante il recupero dei dati dell\'utente:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} className='py-3 text-start'>
          <Link to="/"><Button variant="primary"><i className="bi bi-house me-1"></i>Torna alla Home</Button></Link>
        </Col>
        <Col xs={12} lg={6} className='mb-3'>
          {userData && (
            <div className='border rounded bg-light p-3'>
              <h2>Le tue info</h2>
              <img src={userData.avatar} className='img-fluid w-25' alt={userData.firstName} />
              <p>Nome Cognome: {userData.firstName} {userData.lastName}</p>
              <p>Email: {userData.email}</p>
              <p>Data di nascita: {userData.birthDate}</p>
              <p>Ruolo: {userData.role}</p>
              <p>ID: {userData.id}</p>
              <Button variant='warning' onClick={() => setIsEditing(true)}>Modifica Profilo</Button>
            </div>
          )}
        </Col>
        <Col xs={12} lg={6}>
          {userData && isEditing ? (
            <div className='border rounded bg-light'>
              <EditUser userData={userData} userId={userData.id} onUpdateUser={fetchUserData} />
              <Button variant='success' className="mb-3" onClick={closeEditUser} >Chiudi Modifica</Button>
            </div>
          ) : null}
        </Col>
      </Row>
      <Row>
        <PostsByUser userId={userData.id}/>
      </Row>
    </Container>
  );
}
