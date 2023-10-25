import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CommentList from './CommentList'
import AddComment from './AddComment'
import { Button } from 'react-bootstrap';

export default function CommentArea({postId}) {
  const [comments, setComments] = useState([]);
  const [showAddComment, setAddShowComment] = useState(false);

  const getComments = async ()  => {
    const response= await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/posts/${postId}/comments`)
    setComments(response.data.result);
  }

  const toggleComments = () => {
    setAddShowComment(!showAddComment);
  };

  useEffect(() => {
    getComments()
  }, [])

  const updateComment = () =>{
    getComments()
  }
  const onDelete = () =>{
    getComments()
  }
  
  return (
    <>
      {comments.length > 0 ? (
        <div>
          <CommentList comments={comments} updateComment={updateComment} onDelete={onDelete}/>
        </div>
      ) : (
        <div className='py-3 border bg-light my-2 rounded'>
          <p>Non è stato ancora lasciato un commento.</p>
        </div>
      )}
        <Button variant="success" onClick={toggleComments}>
          <i className="bi bi-plus me-1"></i>Aggiungi Commento
        </Button>
        {showAddComment && <AddComment postId={postId} updateComment={updateComment}/>}
    </>
  )
}