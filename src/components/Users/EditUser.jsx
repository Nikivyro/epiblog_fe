import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

export default function EditUser({ userData, userId, onUpdateUser }) {
  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    avatar: userData.avatar,
    birthDate: userData.birthDate,
    password: userData.password,
  });
  const [avatar, setAvatar] = useState(null);
  const [defaultAvatar, setDefaultAvatar] = useState(userData.avatar);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForCloudinary = new FormData();
      if (avatar) {
        formDataForCloudinary.append('avatar', avatar);
      }

      if (avatar) {
        const cloudinaryResponse = await fetch(
          `${process.env.REACT_APP_URL_ENDPOINT}/user/avatarUpload`,
          {
            method: 'POST',
            body: formDataForCloudinary,
          }
        );

        if (cloudinaryResponse.status === 200) {
          const cloudinaryData = await cloudinaryResponse.json();
          formData.avatar = cloudinaryData.avatar;
        } else {
          setErrorMessage("Errore nell'upload dell'avatar su Cloudinary");
          return;
        }
      }

      const response = await axios.patch(
        `${process.env.REACT_APP_URL_ENDPOINT}/users/${userId}/update`,
        formData
      );

      if (response.status === 200) {
        onUpdateUser(response.data.result);
      } else {
        setErrorMessage("Errore nell'aggiornamento del post");
      }
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del profilo:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container className='p-3 rounded'>
      <h3 className='mb-3'>Modifica i tuoi dati</h3>
      <Form onSubmit={handleFormSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className='fw-bold mb-2'>Nome:</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label className='fw-bold mb-2'>Cognome:</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label className='fw-bold mb-2'>Email:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className='fw-bold mb-2'>Avatar:</Form.Label>
          <Form.Control
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          {defaultAvatar && (
            <Image src={defaultAvatar} alt="Default Avatar" style={{ maxWidth: '100px' }} />
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className='fw-bold mb-2'>Data di Nascita:</Form.Label>
          <Form.Control
            type="text"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button type="submit">Salva Modifiche</Button>
      </Form>
    </Container>
  );
}
