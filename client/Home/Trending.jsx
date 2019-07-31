import React from 'react';
import { Link } from '@reach/router';
import useFetch from 'fetch-suspense';

import JobTile from 'shared/JobTile.jsx';

import 'Home/Trending.css'

function Trending() {
  const trending = useFetch('http://localhost:3000/api/trending');

  return (
    <>
      {trending.map(job => (
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

export default Trending;
