import React from 'react';
import { Link } from '@reach/router';

import './JobTile.css';

function JobTile({ job }) {
  return (
    <Link
      to={`/jobs/${job.companyCode}/${job.id}`}
      className="jobtile__container"
    >
      <div className="jobtile__leftcontent">
        <h3 className="jobtile__companyname">{job.companyName}</h3>
        <h4 className="jobtile__jobtitle">{job.jobTitle}</h4>
        <div className="jobtile__interactions">
          <span className="jobtile__discussion">●{job.discussion.length}</span>
          <span className="jobtile__squares">▊{job.squares}</span>
        </div>
      </div>
      <div className="jobtile__rightcontent">
        <div className={`jobtile__status jobtile__status--${job.statusStage}`}>
          {job.status}
        </div>
        <div className="jobtile__pay">${job.pay}/mo</div>
      </div>
    </Link>
  );
}

export default JobTile;
