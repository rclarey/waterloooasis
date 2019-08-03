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

function JobTile({ job, big = false }) {
  return (
    <div className={`jobtile__container${big ? ' jobtile--big' : ''}`}>
      <div className="jobtile__leftcontent">
        <h3 className="jobtile__companyname">{job.company.name}</h3>
        <h4 className="jobtile__jobtitle">{job.title}</h4>
        <div className="jobtile__interactions">
          <div className="jobtile__discussion">
            <img
              className="jobtile__interactions-img"
              src="/svg/comments.svg"
            />
            <span className="jobtile__interactions-text">
              {job.numComments}
            </span>
          </div>
          <div className="jobtile__squares">
            <img
              className="jobtile__interactions-img"
              src="/svg/applications.svg"
            />
            <span className="jobtile__interactions-text">{job.numFollows}</span>
          </div>
        </div>
      </div>
      <div className="jobtile__rightcontent">
        <div className={`jobtile__status jobtile__status--${job.statusStage}`}>
          {job.status}
        </div>
        <div className="jobtile__location">{job.location}</div>
        <div className="jobtile__rating">
          <MemoedRatingStars rating={job.rating} />
          <span>{job.numReviewers}</span>
        </div>
      </div>
    </div>
  );
}
JobTile.propTypes = {
  job: PropTypes.object.isRequired,
  big: PropTypes.bool,
};

export default JobTile;
