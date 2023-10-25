import React from 'react';
import SingleComment from './SingleComment';

export default function CommentList({ comments, updateComment, onDelete }) {
  return (
    <>
      {comments.map((comment) => (
          <SingleComment key={comment._id} comment={comment} updateComment={updateComment} onDelete={onDelete} />
        ))
      }
    </>
  );
}