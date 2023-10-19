import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { setUser } from '../reducers/userSlice';
import PostsByUser from '../components/PostsByUser';
import EditUser from '../components/EditUser';

export default function UserPage() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    // Recupera il token dell'utente dal localStorage
    const loggedInUserToken = localStorage.getItem('loggedInUser');

    if (loggedInUserToken) {
      try {
        const decodedToken = jwtDecode(loggedInUserToken);
        dispatch(setUser(decodedToken));
      } catch (error) {
        console.error('Errore nel decoding del token:', error);
      }
    }
  }, [dispatch]);

  return (
    <>
      <div>UserPage</div>
      <Link to="/">Vai alla Home</Link>
      {userData && (
        <div>
          <h2>Dati dell'utente:</h2>
          <p>Nome: {userData.firstName}</p>
          <p>Email: {userData.email}</p>
          <p>avatar: {userData.avatar}</p>
          <p>birtday: {userData.birthDate}</p>
          <p>role: {userData.role}</p>
          <p>id: {userData.id}</p>
          <p>Creare form per modificare o patchare il Profilo</p>
          <PostsByUser userId={userData.id}/>
          <EditUser userId={userData.id}/>
        </div>
      )}
    </>
  );
}
