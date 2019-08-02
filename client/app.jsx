import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Router } from '@reach/router';
import 'regenerator-runtime/runtime';

import FourOhFour from 'shared/FourOhFour.jsx';
import Nav from 'Nav.jsx';
import Home from 'Home/Home.jsx';
import Trending from 'Home/Trending.jsx';
import MyJobs from 'Home/MyJobs.jsx';
import MyComments from 'Home/MyComments.jsx';

import Profile from 'Profile/Profile.jsx';
import MyAccount from 'Profile/MyAccount.jsx';
import Privacy from 'Profile/Privacy.jsx';

import Job from 'Job/Job.jsx';
import Company from 'Company/Company.jsx';

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
      <Profile path="profile">
        <MyAccount path="myaccount" />
        <Privacy path="privacy" />
      </Profile>
      <Company path="jobs/:shortName/" />
      <Job path="jobs/:shortName/:jobCode/" />
      <FourOhFour default />
    </Router>
  </>,
  document.getElementById('app'),
);
