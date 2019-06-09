import React from "react";
import { Link } from "@reach/router";

import "./JobTile.css";

function JobTile({ job }) {
  return (
    <Link to={`/jobs/${job.companyCode}/${job.id}`} class="jobtile__container">
      <div class="jobtile__leftcontent">
        <h3 class="jobtile__companyname">{job.companyName}</h3>
        <h4 class="jobtile__jobtitle">{job.jobTitle}</h4>
        <div class="jobtile__interactions">
          <span class="jobtile__discussion">●{job.discussion.length}</span>
          <span class="jobtile__squares">▊{job.squares}</span>
        </div>
      </div>
      <div class="jobtile__rightcontent">
        <div class={`jobtile__status jobtile__status--${job.statusStage}`}>
          {job.status}
        </div>
        <div class="jobtile__pay">${job.pay}/mo</div>
      </div>
    </Link>
  );
}

export default JobTile;
