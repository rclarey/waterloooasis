import React from 'react';
import { Link } from '@reach/router';
import useFetch from 'fetch-suspense';

import JobTile from 'shared/JobTile.jsx';

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
    </>
  );
}

export default Trending;
