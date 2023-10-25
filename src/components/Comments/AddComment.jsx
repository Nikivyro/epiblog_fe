import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AddComment({ postId, updateComment }) {
  const [commentText, setCommentText] = useState('');
  const [commentRate, setCommentRate] = useState(0);

  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCommentData = {
      comment: commentText,
      rate: commentRate,
      author: currentUserId
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_URL_ENDPOINT}/posts/${postId}/comments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCommentData),
      });

      if (response.status === 201) {
        setCommentText('');
        setCommentRate(0);
        updateComment()
      } else {
        // Gestisci eventuali errori qui, ad esempio mostrando un messaggio di errore all'utente.
      }
    } catch (error) {
      console.error('Errore nella creazione del commento:', error);
    }
  };

  return (
    <div className='border p-3 bg-light my-3'>
      <p className='h5 fw-bold'>Aggiungi un commento</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className='fw-bold mb-2'>Commento:</Form.Label>
          <Form.Control
            type="text"
            placeholder='Il tuo commento...'
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='fw-bold mb-2'>
          <Form.Label>Voto:</Form.Label>
          <Form.Control
            type="number"
            max={5}
            min={1}
            value={commentRate}
            onChange={(e) => setCommentRate(parseInt(e.target.value))}
          />
        </Form.Group>
        <Button className="my-3" variant="primary" type="submit">
          Scrivi
        </Button>
      </Form>
    </div>
  );
}
