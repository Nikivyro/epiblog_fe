import React, { useState, useRef } from 'react';
import EditPostModal from './EditPostModal';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import CommentArea from '../Comments/CommentArea';

export default function SinglePost({ _id, title, cover, category, author, readTime, content }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);

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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleModalClose = () => {
    setIsEditing(false);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <Col key={_id} xs={12} ref={colRef}>
      <Card>
        <Card.Body>
          <Card.Title className='text-start h6'>
            {author && (
              <>
                <img src={author.avatar} alt={author.name} width={30} className='me-2'/>
                {author.firstName} ha pubblicato 
              </>
            )}
            {title}
          </Card.Title>
          <Card.Text>
            <Badge bg="secondary">{category}</Badge>
            <p>{content}</p>
            {readTime && (
              <>
                <p>{readTime.value} - {readTime.unit}</p>
              </>
            )}
          </Card.Text>
        </Card.Body>
        <Card.Img variant="bottom" src={cover} alt={title}/>
        <Card.Body>
          <Button variant="primary" onClick={handleEditClick}>Modifica Post</Button>
          <Button variant="success" onClick={toggleComments}>
            {showComments ? 'Nascondi Commenti' : 'Mostra Commenti'}
          </Button>
          <Link to={`/posts/${_id}`} className='text-white text-decoration-none'>
            <Button variant="danger">Vai al post</Button>
          </Link>
        </Card.Body>
      </Card>
      {isEditing && (
        <EditPostModal
          _id={_id}
          initialData={postData}
          onUpdate={handleModalClose}
        />
      )}
      {showComments && <CommentArea postId={_id} />}
    </Col>
  );
}
