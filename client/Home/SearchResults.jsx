import React, { memo } from 'react';
import PropTypes from 'prop-types';
import useFetch from 'fetch-suspense';
import { Link } from '@reach/router';

import CompanyTile from 'shared/CompanyTile.jsx';
import JobTile from 'shared/JobTile.jsx';

function SearchResults({ query }) {
  const results = useFetch(`/api/search/${query}`);
  console.log(results);

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
      {results.jobs.map(job => (
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
SearchResults.propTypes = {
  query: PropTypes.string,
};

export default memo(SearchResults);