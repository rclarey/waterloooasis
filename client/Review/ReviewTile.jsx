import React, { memo } from 'react';
import PropTypes from 'prop-types';

import 'shared/JobTile.css';

function ratingRange(pos, rating) {
  const n = rating - pos;
  if (n <= 0.12) {
    return 0;
  }
  if (n <= 0.37) {
    return 1;
  }
  if (n <= 0.62) {
    return 2;
  }
  if (n <= 0.87) {
    return 3;
  }

  return 4;
}

function RatingStars({ rating }) {
  const inds = [0, 1, 2, 3, 4];
  return (
    <span className="jobtile__stars">
      {inds.map(i => (
        <img
          key={i}
          className="jobtile__star"
          src={`/svg/star-${ratingRange(i, rating)}.svg`}
        />
      ))}
    </span>
  );
}
RatingStars.propTypes = {
  rating: PropTypes.number.isRequired,
};
const MemoedRatingStars = memo(RatingStars);

function reviewStatus(review) {
  if (review.interview_state == 1) {
    if (review.internship_state == 1) {
      return 'Offered and accepted an internship';
    } else if (review.internship_state == 2) {
      return 'Offered an internship but did not accept it';
    } else if (review.internship_state == 1) {
      return 'Interviewed but did not receive an offer';
    }
  } else if (review.interview_state == 2) {
    return 'Not offered an interview';
  } else if (review.interview_state == 3) {
    return 'Not contacted by recruiter';
  }
}

function ReviewTile({ review }) {
  return (
    <div className={`jobtile__container`}>
      <div className="jobtile__leftcontent">
        <h3 className="jobtile__companyname">{review.name}</h3>
        <h4 className="jobtile__jobtitle">{review.position}</h4>
      </div>
      <div className="jobtile__rightcontent">
        <div className="jobtile__status">
          {review.position}
        </div>
        <div className="jobtile__location">{review.city}</div>
        <div className="jobtile__rating">
          <MemoedRatingStars rating={review.rating} />
        </div>
      </div>
    </div>
  );
}
ReviewTile.propTypes = {
  review: PropTypes.object.isRequired,
};

export default ReviewTile;
