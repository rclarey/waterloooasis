import React, { memo } from 'react';
import PropTypes from 'prop-types';
import useFetch from 'fetch-suspense';
import { Link } from '@reach/router';
import queryString from 'query-string';

import CompanyTile from 'shared/CompanyTile.jsx';
import JobTile from 'shared/JobTile.jsx';

import 'Home/SearchResults.css';

function SearchResults() {
  const queryParams = queryString.parse(location.search);
  const results = useFetch(`/api/search/${queryParams.q}`);

  return (
    <>
      {results.companies.length > 0 ? (
        results.companies.map(company => (
          <Link
            to={`/company/${company.id}`}
            key={company.id}
          >
            <CompanyTile company={company} />
          </Link>
        ))
      ) : (
        <MemoedNoSearchResults />
      )}
      <div className="search__overlay" />
    </>
  );
}

function NoSearchResults() {
  return (
    <div className="search__nonecompanies">
      <p className="search__noneheader">No Results!</p>
      <p>Please try again with other search terms.</p>
    </div>
  );
}
const MemoedNoSearchResults = memo(NoSearchResults);

export default memo(SearchResults);