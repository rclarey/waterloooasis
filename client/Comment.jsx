import React from 'react';

import './Comment.css';

function Comment({ comment }) {
  return (
    <div>
      <p>{comment.text}</p>
      <div className="comment__replycontainer">
        {comment.replies.map(reply => (
          <Comment key={reply.text} comment={reply} />
        ))}
      </div>
    </div>
  );
}

export default Comment;
