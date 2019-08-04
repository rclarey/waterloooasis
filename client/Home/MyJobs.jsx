import React from 'react';
import { Link } from '@reach/router';
import useFetch from 'fetch-suspense';

import JobTile from 'shared/JobTile.jsx';

import 'Home/Trending.css';

function MyJobs() {
  const myjobs = useFetch('api/myjobs');

  return (
    <>
      {myjobs.map(job => (
        <Link
          to={`/jobs/${job.company.shortName}/${job.shortCode}`}
          key={job.id}
        >
          <JobTile job={job} />
        </Link>
      ))}
      <div className="trending__overlay" />
    </>
  );
}

export default MyJobs;
