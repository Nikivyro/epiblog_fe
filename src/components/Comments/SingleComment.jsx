import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

export default function SingleComment({ comment, onDelete, updateComment }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.id);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [editedCommentRate, setEditedCommentRate] = useState(comment.rate);

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditedComment(comment.comment);
    setEditedCommentRate(comment.rate);
  }

  const handleEditModalSave = async () => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_URL_ENDPOINT}/posts/${comment.refPost}/comments/update/${comment._id}`, {
        comment: editedComment,
        rate: editedCommentRate
      });

      updateComment()

      setShowEditModal(false);
    } catch (error) {
      console.error("Errore durante l'aggiornamento del commento", error);
    }
  }

  const handleCommentDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL_ENDPOINT}/posts/${comment.refPost}/delete/${comment._id}`);
      onDelete(comment._id);
    } catch (error) {
      console.error("Errore durante la cancellazione del commento", error);
    }
  }

  return (
    <div className='border my-3 bg-light'>
      <div className="d-flex p-2">
        <img src={comment.author.avatar} className='img-fluid me-3 align-self-start' width={30} alt={comment.author.firstName} />
        <div className="content-comment text-start">
          <span className='small'>{comment.author.firstName} {comment.author.lastName}:</span><br></br>
          <span className='small'>Voto: {comment.rate}/5</span>
          <p className='small'>{comment.comment}</p>
        </div>
        {currentUserId === comment.author._id && (
          <div className='ms-auto align-self-center d-flex flex-column'>
            <Button variant="primary" className="mb-1" onClick={() => setShowEditModal(true)}><i className="bi bi-pencil me-1"></i>Modifica</Button>
            <Button variant="danger" onClick={handleCommentDelete}><i className="bi bi-trash me-1"></i>Elimina</Button>
          </div>
        )}
      </div>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Commento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="editedComment">
            <Form.Label>Commento</Form.Label>
            <Form.Control
              type="text"
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="editedCommentRate">
            <Form.Label>Voto</Form.Label>
            <Form.Control
              type="number"
              max={5}
              min={1}
              value={editedCommentRate}
              onChange={(e) => setEditedCommentRate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleEditModalSave}>
            Salva Modifiche
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
