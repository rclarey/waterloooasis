import React from 'react';
import { Link } from '@reach/router';

import './JobTile.css';

function JobTile({ job, big = false }) {
  return (
    <div className={`jobtile__container${big ? ' jobtile--big' : ''}`}>
      <div className="jobtile__leftcontent">
        <h3 className="jobtile__companyname">{job.company.name}</h3>
        <h4 className="jobtile__jobtitle">{job.title}</h4>
        <div className="jobtile__interactions">
          <span className="jobtile__discussion">●{job.comments.length}</span>
          <span className="jobtile__squares">▊{job.squares}</span>
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

export default JobTile;
