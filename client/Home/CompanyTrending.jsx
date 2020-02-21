import React from 'react';
import { Link } from '@reach/router';
import useFetch from 'fetch-suspense';

import JobTile from 'shared/JobTile.jsx';
import CompanyTile from 'shared/CompanyTile.jsx';

import 'Home/CompanyTrending.css';

function CompanyTrending() {
  const trending = useFetch('api/companytrending');
  console.log(trending);

  return (
    //  {trending.map(company => (
    //    <Link
    //      to={`/company/${company.id}`}
    //      key={company.id}
    //    >
    //      <CompanyTile company={company.id} />
    //    </Link>
    //  ))}
      <div className="trending__overlay" />
  );
}

export default CompanyTrending;
