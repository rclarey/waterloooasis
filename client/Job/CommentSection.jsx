import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Comment from 'shared/Comment.jsx';
import Composer from 'Job/Composer.jsx';
import { useApi } from 'utils.js';

import 'Job/CommentSection.css';

function NoComments() {
  return (
    <div className="commentsection__nocomments">
      <p className="commentsection__noneheader">No Comments Yet</p>
      <p>Be the first to share what you think!</p>
    </div>
  );
}
const MemoedNoComments = memo(NoComments);

function CommentSection({ jobId, companyId }) {
  const result = useApi('/comments', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jobId,
      companyId,
    }),
  });
  const [comments, setComments] = useState(result.comments);
  const patchComments = useCallback(
    comment => {
      setComments(old => [comment].concat(old));
    },
    [setComments],
  );

  return (
    <>
      <Composer
        jobId={jobId}
        companyId={companyId}
        patchComments={patchComments}
      />
      {/* <div className="commentsection__sortby"> */}
      {/*   <span className="commentsection__sortlabel">Sort by</span> */}
      {/*   <ODropdown */}
      {/*     label="Sort by" */}
      {/*     options={['Best', 'Top rated', 'Most recent']} */}
      {/*     initial="Best" */}
      {/*   /> */}
      {/* </div> */}
      <div className="commentsection__list">
        {comments.length > 0 ? (
          comments.map((comment, i) => (
            <Comment
              key={comment.id}
              comment={comment}
              last={i === comments.length - 1}
            />
          ))
        ) : (
          <MemoedNoComments />
        )}
      </div>
    </>
  );
}
CommentSection.propTypes = {
  jobId: PropTypes.number.isRequired,
  companyId: PropTypes.number.isRequired,
};

export default memo(CommentSection);
