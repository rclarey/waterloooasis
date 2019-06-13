import React from 'react';

import './Comment.css';

function Comment({ comment }) {
  return (
    <div className="comment__container">
      <div className="comment__body">
        <span className="comment__authorname">{comment.author.name}</span>
        <span className="comment__timestring">{comment.timeString}</span>
        <p className="comment__text">{comment.text}</p>
        <span className="comment__likes">{comment.likes} likes</span>
        <span className="comment__reply">Reply</span>
      </div>
      <div className="comment__replycontainer">
        {comment.replies.map(reply => (
          <Comment key={reply.text} comment={reply} />
        ))}
      </div>
    </div>
  );
}

export default Comment;
