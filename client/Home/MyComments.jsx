import React from 'react';
import useFetch from 'fetch-suspense';

import Comment from 'shared/Comment.jsx';
import 'Home/Trending.css';
import 'Job/Job.css';

function MyComments() {
  const mycomments = useFetch('api/mycomments');

  // TODO: fix this
  return (
    <>
      {mycomments.map(comment => (
        <Comment comment={comment} key={null} />
      ))}
    </>
  );
}

export default MyComments;
