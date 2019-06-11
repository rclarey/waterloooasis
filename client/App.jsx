import React from 'react';
import { Router } from '@reach/router';

import Company from './Company';
import Job from './Job';
import Home from './Home';
import Nav from './Nav';

import { job, trending } from './fakeData';
import './App.css';

function App() {
  return (
    <>
      <Nav />
      <Router className="app__content">
        <Home path="/" trending={trending} />
        <Company path="jobs/:shortName/" />
        <Job path="jobs/:shortName/:jobCode/" job={job} />
      </Router>
    </>
  );
}

export default App;
