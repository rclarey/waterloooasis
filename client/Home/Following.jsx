import React, { memo } from 'react';
import { Link } from '@reach/router';
import useFetch from 'fetch-suspense';

import CompanyTile from 'shared/CompanyTile.jsx';

import 'Home/Following.css';

function Following() {
  const following = useFetch('api/following');

  return (
    <>
      {following.length > 0 ? (
        following.map(company => (
          <Link
            to={`/company/${company.id}`}
            key={company.id}
          >
            <CompanyTile company={company} />
          </Link>
        ))
      ) : (
        <NoFollowing />
      )}
      <div className="following__overlay" />
    </>
  );
}


function NoFollowing() {
  return (
    <div className="following__nocompanies">
      <p className="following__noneheader">You're not following any companies!</p>
      <p>Follow companies to keep up to date on new reviews.</p>
    </div>
  );
}
/*
const MemoedNoFollowing = memo(NoFollowing);
*/

export default Following;