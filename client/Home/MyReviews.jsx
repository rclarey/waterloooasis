import React, { memo } from 'react';
import useFetch from 'fetch-suspense';
import { Link, navigate } from '@reach/router';

import 'Home/Trending.css';
import 'Job/Job.css';

import OButton from 'oasisui/OButton.jsx';

import 'Review/ReviewForm.css';

function MyReviews() {
  //const myreviews = useFetch('api/myreviews');

  // TODO: fix this
  return (
    <>
      <div className="myreviews__writereview__container">
        <Link to="/writereview">
          <OButton text="Write a Review" />
        </Link>
      </div>
      <MemoedNoReviews />
      <div className="trending__overlay" />
    </>
  );
}

function NoReviews() {
  return (
    <div className="myreviews__nojobs">
      <p className="myreviews__noneheader">You have not written any reviews</p>
      <p>All reviews are welcome!</p>
    </div>
  );
}
const MemoedNoReviews = memo(NoReviews);

export default MyReviews;
