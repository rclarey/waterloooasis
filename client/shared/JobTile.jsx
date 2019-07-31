import React from 'react';
import PropTypes from 'prop-types';

import 'shared/JobTile.css';

function JobTile({ job, big = false }) {
  return (
    <div className={`jobtile__container${big ? ' jobtile--big' : ''}`}>
      <div className="jobtile__leftcontent">
        <h3 className="jobtile__companyname">{job.company.name}</h3>
        <h4 className="jobtile__jobtitle">{job.title}</h4>
        <div className="jobtile__interactions">
          <div className="jobtile__discussion">
            <img className="jobtile__interactions-img" src="svg/comments.svg" />
            <span className="jobtile__interactions-text">
              {job.commentCount}
            </span>
          </div>
          <div className="jobtile__squares">
            <img
              className="jobtile__interactions-img"
              src="svg/applications.svg"
            />
            <span className="jobtile__interactions-text">{job.squares}</span>
          </div>
        </div>
      </div>
      <div className="jobtile__rightcontent">
        <div className={`jobtile__status jobtile__status--${job.statusStage}`}>
          {job.status}
        </div>
        <div className="jobtile__pay">${job.pay}/mo</div>
      </div>
    </div>
  );
}
JobTile.propTypes = {
  job: PropTypes.object.isRequired,
  big: PropTypes.bool,
};

export default JobTile;
