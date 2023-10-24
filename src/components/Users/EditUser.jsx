import React, { useState } from 'react';
import axios from 'axios';

export default function EditUser({ userData, userId, onUpdateUser }) {
  const [formData, setFormData] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`${process.env.REACT_APP_URL_ENDPOINT}/users/${userId}/update`, formData);
      console.log('Dati utente aggiornati con successo:', response.data);

      setIsEditing(false);
      onUpdateUser(response.data.result); // Chiama la funzione di callback per aggiornare i dati dell'utente
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del profilo:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h3>Edit User: {userId}</h3>
      {isEditing ? (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="firstName">Nome:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Cognome:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="avatar">Avatar:</label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="birthDate">Data di nascita:</label>
            <input
              type="text"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="role">Ruolo:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="author">Author</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Salva Modifiche</button>
          <button onClick={() => setIsEditing(false)}>Annulla</button>
        </form>
      ) : (
        <button onClick={() => setIsEditing(true)}>Modifica Profilo</button>
      )}
    </div>
  );
}
