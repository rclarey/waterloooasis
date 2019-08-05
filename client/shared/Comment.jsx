import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Composer from 'Job/Composer.jsx';
import { post } from 'utils.js';

import 'shared/Comment.css';

function Comment({ comment }) {
  const [liked, setLiked] = useState(comment.liked);
  const [likes, setLikes] = useState(comment.likes);
  const [replies, setReplies] = useState(comment.replies);
  const [composerOpen, setComposerOpen] = useState(false);

  const onLike = useCallback(async () => {
    let value;
    try {
      setLiked(old => {
        value = !old;
        return value;
      });
      setLikes(old => old + (value ? 1 : -1));
      await post('/like', { value, commentId: comment.id });
    } catch (e) {
      setLiked(!value);
      setLikes(old => old - (value ? 1 : -1));
    }
  }, [setLiked, comment.id]);

  const onReplyToggle = useCallback(() => {
    setComposerOpen(old => !old);
  }, []);

  const patchReplies = useCallback(reply => {
    setReplies(old => [reply].concat(old));
    setComposerOpen(false);
  }, []);

  const likeClass = classnames('comment__like', {
    'comment__like--liked': liked,
  });

  return (
    <div className="comment__container">
      <div className="comment__body">
        <span className="comment__authorname">{comment.author.username}</span>
        <span className="comment__timestring">{comment.timeString}</span>
        <p className="comment__text">{comment.text}</p>
        <span className="comment__likes">{likes} likes</span>
        <span className={likeClass} onClick={onLike}>
          {liked ? 'Liked' : 'Like'}
        </span>
        <span className="comment__reply" onClick={onReplyToggle}>
          Reply
        </span>
      </div>
      {replies.length > 0 || composerOpen ? (
        <div className="comment__replycontainer">
          {composerOpen ? (
            <div className="comment__replycomposer">
              <Composer
                width={400}
                jobId={comment.jobId}
                companyId={comment.companyId}
                parentId={comment.id}
                patchComments={patchReplies}
              />
            </div>
          ) : null}
          {replies.map((reply, i) => (
            <Comment
              key={reply.text}
              comment={reply}
              last={i === comment.replies.length - 1}
            />
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
