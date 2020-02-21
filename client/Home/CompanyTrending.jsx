import React from 'react';
import { Link } from '@reach/router';
import useFetch from 'fetch-suspense';

import CompanyTile from 'shared/CompanyTile.jsx';

import 'Home/CompanyTrending.css';

function CompanyTrending() {
  const trending = useFetch('api/companytrending');

  return (
    <>
      {trending.map(company => (
        <Link
          to={`/company/${company.id}`}
          key={company.id}
        >
          <CompanyTile company={company} />
        </Link>
      ))}
      <div className="trending__overlay" />
    </>
  );
}

export default CompanyTrending;
