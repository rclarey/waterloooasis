import React from 'react';
import PropTypes from 'prop-types';

import 'shared/Comment.css';

function Comment({ comment, last = false }) {
  const containerClass = `comment__container${last ? ' comment--last' : ''}`;

  return (
    <div className={containerClass}>
      <div className="comment__body">
        <span className="comment__authorname">{comment.author.name}</span>
        <span className="comment__timestring">{comment.timeString}</span>
        <p className="comment__text">{comment.text}</p>
        <span className="comment__likes">{comment.likes} likes</span>
        <span className="comment__reply">Reply</span>
      </div>
      {comment.replies.length > 0 ? (
        <div className="comment__replycontainer">
          {comment.replies.map(reply => (
            <Comment key={reply.text} comment={reply} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  last: PropTypes.bool,
};

export default Comment;
