import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';

import App from 'App.jsx';
import Company from 'Company/Company.jsx';
import FourOhFour from 'FourOhFour.jsx';
import Home from 'Home/Home.jsx';
import Job from 'Job/Job.jsx';
import MyComments from 'Home/MyComments.jsx';
import MyJobs from 'Home/MyJobs.jsx';
import SignIn from 'SignIn.jsx';
import Trending from 'Home/Trending.jsx';

import 'index.css';

ReactDOM.render(
  <Router>
    <App path="/">
      <Home path="/">
        <Trending path="trending" />
        <MyJobs path="myjobs" />
        <MyComments path="mycomments" />
      </Home>
      <Company path="jobs/:shortName/" />
      <Job path="jobs/:shortName/:jobCode/" />
    </App>
    <SignIn path="/signin" />
    <FourOhFour default />
  </Router>,
  document.getElementById('app'),
);
