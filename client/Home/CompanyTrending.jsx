import React, { memo } from 'react';
import { Link } from '@reach/router';
import useFetch from 'fetch-suspense';

import CompanyTile from 'shared/CompanyTile.jsx';

import 'Home/CompanyTrending.css';

function CompanyTrending() {
  const trending = useFetch('api/trending');

  return (
    <>
      {trending.length > 0 ? (
        trending.map(company => (
          <Link
            to={`/company/${company.id}`}
            key={company.id}
          >
            <CompanyTile company={company} />
          </Link>
        ))
      ) : (
        <MemoedNoReviews />
      )}
      <div className="trending__overlay" />
    </>
  );
}

function NoReviews() {
  return (
    <div className="trending__nojobs">
      <p className="trending__noneheader">Oops!</p>
      <p>Reviews for companies could not be retrieved.</p>
    </div>
  );
}
const MemoedNoReviews = memo(NoReviews);

export default CompanyTrending;
