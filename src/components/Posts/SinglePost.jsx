import React, { useState, useRef } from 'react';
import EditPostModal from './EditPostModal';
import { Button, Col, Row, Spinner, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import CommentArea from '../Comments/CommentArea';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function SinglePost({ _id, title, cover, category, author, readTime, content, currentUser, refreshPosts }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const colRef = useRef(null);

  const postData = {
    title,
    cover,
    category,
    readTime: {
      value: readTime.value,
      unit: readTime.unit,
    },
    content,
  };

  const toggleModalEdit = () => {
    setShowModalEdit(!showModalEdit);
  };

  const closeModalEdit = () =>{
    setShowModalEdit(false)
    refreshPosts()
  }

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const modalConfirmRemove = () =>{
    setShowDeleteModal(!showDeleteModal)
  }

  const handleDelete = async () =>{
    try {
      await axios.delete(`${process.env.REACT_APP_URL_ENDPOINT}/posts/delete/${_id}`);
      refreshPosts()
    } catch (error) {
      console.error("Errore durante la cancellazione del commento", error);
    }
  }


  return (
    <Col key={_id} xs={12} ref={colRef} className='mb-3'>
      <Card className='bg-light'>
        <Card.Body>
          <Card.Text>
          <div className="d-flex">
            {author && (
              <>
                <img src={author.avatar} alt={author.name} width={30} className='me-2 align-self-start pe-3'/>
              </>
            )}
              <div className="content text-start">
                <p className='mb-1'><span className='fw-bold'>{author.firstName}</span> ha pubblicato: <span className='fw-bold'>{title}</span></p>
                <Badge bg="secondary">{category}</Badge>
                <p>{content}</p>
                {readTime && (
                  <>
                    <p><i className="bi bi-clock me-1"></i>{readTime.value} - {readTime.unit}</p>
                  </>
                )}
              </div>
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Img variant="bottom" src={cover} alt={title}/>
        <Card.Body>
          <div className="d-flex justify-content-between flex-column flex-md-row">
          {currentUser === author._id && (
            <div>
              <Button variant="primary" onClick={toggleModalEdit} className='me-2'><i className="bi bi-pencil me-1"></i>Modifica Post</Button>
              <Button variant="danger" onClick={modalConfirmRemove}><i className="bi bi-trash3 me-1"></i>Elimina</Button>
            </div>
            )}
            <Button variant="success" onClick={toggleComments} className='my-2'>
              <i className="bi bi-chat-left-text me-1"></i>
              {showComments ? 'Nascondi Commenti' : 'Mostra Commenti'}
            </Button>
            <Link to={`/posts/${_id}`} className='text-white text-decoration-none'>
              <Button variant="warning">Vai al post<i className="bi bi-arrow-right ms-1"></i></Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
      {showModalEdit && (
        <Modal show={showModalEdit} onHide={toggleModalEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditPostModal
              _id={_id}
              initialData={postData}
              closeModalEdit={closeModalEdit}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModalEdit}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal show={showDeleteModal} onHide={modalConfirmRemove}>
          <Modal.Header closeButton>
            <Modal.Title>Vuoi davvero eliminare questo post?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDelete}>
              Si, voglio eliminarlo
            </Button>
            <Button variant="secondary" onClick={modalConfirmRemove}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showComments && <CommentArea postId={_id} />}
    </Col>
  );
}
