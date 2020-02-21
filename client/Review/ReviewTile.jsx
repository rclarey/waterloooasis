import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import 'Review/ReviewTile.css';

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
    <span className="reviewtile__stars">
      {inds.map(i => (
        <img
          key={i}
          className="reviewtile__star"
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
      return {
        state : 1,
        val : 'Offered and accepted an internship'
      };
    } else if (review.internship_state == 2) {
      return {
        state : 2,
        val : 'Offered an internship but did not accept it'
      };
    } else if (review.internship_state == 1) {
      return {
        state : 2,
        val : 'Interviewed but did not receive an offer'
      };
    }
  } else if (review.interview_state == 2) {
    return {
      state : 3,
      val : 'Not offered an interview'
    };
  } else if (review.interview_state == 3) {
    return {
      state : 3,
      val : 'Not contacted by recruiter'
    };
  }
}

function ReviewTile({ review, doRedirect = true}) {
  const status = reviewStatus(review);
  return (
    <>
      <div className="reviewtile__container">
        <div className={`reviewtile__infosect`}>
          <div className="reviewtile__leftcontent">
            { doRedirect
              ?
                (<Link
                  to={`/company/${review.id}`}
                  key={review.id}
                >
                  <h3 className="reviewtile__companyname">{review.name}</h3>
                </Link>)
              :
                (
                  <h3 className="reviewtile__companyname__small">{review.name}</h3>
                )
            }
            <h4 className="reviewtile__jobtitle">{review.position}</h4>
            <h4 className="reviewtile__usertitle">{`Written by a student in ${review.term} ${review.faculty}`}</h4>
          </div>
          <div className="reviewtile__rightcontent">
            <div className={`reviewtile__status reviewtile__status--${status.state}`}>
              {status.val}
            </div>
            <div className="reviewtile__location">{review.city}</div>
            <div className="reviewtile__rating">
              <MemoedRatingStars rating={review.rating} />
            </div>
          </div>
        </div>
        <div className="reviewtile__reviews">
          <h4 className="reviewtile__reviewheader">Recruitment Experience</h4>
          { (review.recruitment_review != null
            && review.recruitment_review.length > 0)
            ? (<p className="reviewtile__reviewcontent">{review.recruitment_review}</p>)
            : (<p className="reviewtile__reviewcontent">No comment</p>)
          }
        </div>
        { review.interview_state == 1
          ? (
            <div className="reviewtile__reviews">
              <h4 className="reviewtile__reviewheader">Interview Experience</h4>
              { (review.interview_review != null
                && review.interview_review.length > 0)
                ? (<p className="reviewtile__reviewcontent">{review.interview_review}</p>)
                : (<p className="reviewtile__reviewcontent">No comment</p>)
              }
            </div>)
          : (<> </>)
        }
        { (review.interview_state == 1 && review.internship_state == 1)
          ? (
            <div className="reviewtile__reviews">
              <h4 className="reviewtile__reviewheader">Internship Experience</h4>
              { (review.internship_review != null
                && review.internship_review.length > 0)
                ? (<p className="reviewtile__reviewcontent">{review.internship_review}</p>)
                : (<p className="reviewtile__reviewcontent">No comment</p>)
              }
            </div>)
          : (<> </>)
        }
      </div>
    </>
  );
}
ReviewTile.propTypes = {
  review: PropTypes.object.isRequired,
  doRedirect: PropTypes.bool
};

export default ReviewTile;
