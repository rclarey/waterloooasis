import React, { memo } from 'react';
import { Link } from '@reach/router';
import useFetch from 'fetch-suspense';

import JobTile from 'shared/JobTile.jsx';

import 'Home/Trending.css';
import 'Home/MyJobs.css';

function MyJobs() {
  const myjobs = useFetch('api/myjobs');

  return (
    <>
      {myjobs.length > 0 ? (
        myjobs.map(job => (
          <Link
            to={`/jobs/${job.company.shortName}/${job.shortCode}`}
            key={job.id}
          >
            <JobTile job={job} />
          </Link>
        ))
      ) : (
        <MemoedNoJobs />
      )}
      <div className="trending__overlay" />
    </>
  );
}

function NoJobs() {
  return (
    <div className="myjobs__nojobs">
      <p className="myjobs__noneheader">You are not following any jobs</p>
      <p>Visit a job page and click Follow to add it to this list!</p>
    </div>
  );
}
const MemoedNoJobs = memo(NoJobs);

export default MyJobs;
