import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import 'shared/CompanyTile.css';

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
    <span className="companytile__stars">
      {inds.map(i => (
        <img
          key={i}
          className="companytile__star"
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

function CompanyTile({ company, big = false }) {

  return (
    <div className={`companytile__container${big ? ' companytile--big' : ''}`}>
      <div className="companytile__leftcontent">
          <h3 className="companytile__companyname">{company.name}</h3>
        <div className="companytile__interactions">
          <div className="companytile__discussion">
            <span className="companytile__interactions-text">
              {`Reviews: ${company.numRatings}`}
            </span>
            <img
              className="companytile__interactions-img"
              src="/svg/comments.svg"
            />
          </div>
        </div>
      </div>
      <div className="companytile__rightcontent">
        <div className="companytile__rating">
          <MemoedRatingStars rating={company.totalRating/company.numRatings} />
        </div>
      </div>
    </div>
  );
}
CompanyTile.propTypes = {
  company: PropTypes.object.isRequired,
  big: PropTypes.bool,
};

export default CompanyTile;
