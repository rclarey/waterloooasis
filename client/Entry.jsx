import React, { memo, useState } from 'react';
import { Redirect, Router, Switch } from '@reach/router';
import 'regenerator-runtime/runtime';

import Company from 'Company/Company.jsx';
import FourOhFour from 'shared/FourOhFour.jsx';
import Home from 'Home/Home.jsx';
import Job from 'Job/Job.jsx';
import MyComments from 'Home/MyComments.jsx';
import MyJobs from 'Home/MyJobs.jsx';
import Nav from 'Nav.jsx';
import SearchResults from 'Home/SearchResults.jsx';
import Trending from 'Home/Trending.jsx';
import CompanyTrending from 'Home/CompanyTrending.jsx';
import Following from 'Home/Following.jsx';
import MyReviews from 'Home/MyReviews.jsx';
import ReviewForm from 'Review/ReviewForm.jsx';

import 'global.css';
import 'app.css';

function Entry() {
  return (
    <>
      <Nav />
      <Router>
        <Home path="/" >
          <SearchResults path="search" />
          {/* Removing since deprecated for now */}
          {/* <Trending path="trending" />  */}
          {/* <MyJobs path="myjobs" />  */}
          {/* <MyComments path="mycomments" />  */}
          <Redirect noThrow from="/" to="trending" />
          <Following path="following" />
          <MyReviews path="myreviews" />
          <CompanyTrending path="trending" />
        </Home>
        <Company path="company/:companyId/" />
        <Job path="jobs/:shortName/:jobCode/" />
        <ReviewForm path="writereview" />
        <FourOhFour default />
      </Router>
    </>
  );
}

export default memo(Entry);
