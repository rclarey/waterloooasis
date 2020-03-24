import React, { memo } from 'react';
import PropTypes from 'prop-types';
import useFetch from 'fetch-suspense';
import { Link } from '@reach/router';
import queryString from 'query-string';

import CompanyTile from 'shared/CompanyTile.jsx';
import JobTile from 'shared/JobTile.jsx';

function SearchResults() {
  const queryParams = queryString.parse(location.search);
  const results = useFetch(`/api/search/${queryParams.q}`);

  return (
    <>
      {results.companies.map(company => (
        <Link
          to={`/company/${company.id}`}
          key={company.id}
        >
          <CompanyTile company={company} />
        </Link>
      ))}
      {/* NO MORE JOB POSTINGS */}
      {/* {results.jobs.map(job => (
        <Link
          to={`/jobs/${job.company.shortName}/${job.shortCode}`}
          key={job.id}
        >
          <JobTile job={job} />
        </Link>
      ))} */}
      <div className="trending__overlay" />
    </>
  );
}

export default memo(SearchResults);