import React from 'react'
import SingleComment from './SingleComment'

export default function CommentList({comments}) {
  return (
    <>
        {comments.map((comment) => (
            <div key={comment._id} className='border my-3 bg-light'>
              <div className="d-flex">
                <img src={comment.author.avatar} className='img-fluid me-1 align-self-start' width={30}/>
                <div className="content-comment">
                  <small>{comment.author.firstName}</small>
                  <p>Rate: {comment.rate}</p>
                  <p>Commento: {comment.comment}</p>
                </div>
              </div>
            </div>
        ))}
    </>
  )
}
