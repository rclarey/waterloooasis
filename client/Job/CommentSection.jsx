import React, { memo } from 'react';
// import PropTypes from 'prop-types';

import Composer from 'Job/Composer.jsx';
// import ODropdown from 'oasisui/ODropdown.jsx';

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

function CommentSection() {
  return (
    <>
      <Composer />
      {/* <div className="commentsection__sortby"> */}
      {/*   <span className="commentsection__sortlabel">Sort by</span> */}
      {/*   <ODropdown */}
      {/*     label="Sort by" */}
      {/*     options={['Best', 'Top rated', 'Most recent']} */}
      {/*     initial="Best" */}
      {/*   /> */}
      {/* </div> */}
      <MemoedNoComments />
    </>
  );
}
CommentSection.propTypes = {
  // jobCode: PropTypes.string.isRequired,
};

export default memo(CommentSection);
