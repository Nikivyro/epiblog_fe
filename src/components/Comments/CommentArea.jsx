import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CommentList from './CommentList'
import AddComment from './AddComment'

export default function CommentArea({postId}) {
  const [comments, setComments] = useState([]);
  
  const getComments = async ()  => {
    const response= await axios.get(`${process.env.REACT_APP_URL_ENDPOINT}/posts/${postId}/comments`)
    setComments(response.data.result);
  }

  useEffect(() => {
    getComments()
  }, [])
  
  console.log(comments);

  return (
    <>
        <div>CommentArea di {postId}</div>
        <CommentList comments={comments}/>
        <AddComment/>
    </>
  )
}
