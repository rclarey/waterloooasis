import React, { memo, useState } from 'react';
import { Redirect, Router } from '@reach/router';
import 'regenerator-runtime/runtime';

import Company from 'Company/Company.jsx';
import FourOhFour from 'shared/FourOhFour.jsx';
import Home from 'Home/Home.jsx';
import Job from 'Job/Job.jsx';
import MyComments from 'Home/MyComments.jsx';
import MyJobs from 'Home/MyJobs.jsx';
import Nav from 'Nav.jsx';
import Trending from 'Home/Trending.jsx';

import 'global.css';
import 'app.css';

function Entry() {
  const [query, updateQuery] = useState('');

  const searchUpdate = (newQuery) => {
    console.log('update!');
    updateQuery(newQuery);
  }

  return (
    <>
      <Nav searchUpdate={searchUpdate}/>
      <Router>
        <Home path="/" query={query}>
          <Trending path="trending" />
          <MyJobs path="myjobs" />
          <MyComments path="mycomments" />
          <Redirect noThrow from="/" to="trending" />
        </Home>
        <Company path="jobs/:shortName/" />
        <Job path="jobs/:shortName/:jobCode/" />
        <FourOhFour default />
      </Router>
    </>
  );
}

export default memo(Entry);