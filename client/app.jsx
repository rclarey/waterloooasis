import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(
  <>
    <Nav />
    <Router>
      <Home path="/">
        <Trending path="trending" />
        <MyJobs path="myjobs" />
        <MyComments path="mycomments" />
        <Redirect from="/" to="trending" />
      </Home>
      <Company path="jobs/:shortName/" />
      <Job path="jobs/:shortName/:jobCode/" />
      <FourOhFour default />
    </Router>
  </>,
  document.getElementById('app'),
);
