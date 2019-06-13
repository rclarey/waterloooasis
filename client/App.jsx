import React from 'react';
import { Router } from '@reach/router';

import Company from './Company';
import Job from './Job';
import Home from './Home';
import Nav from './Nav';

import { job } from './fakeData';
import './App.css';

function App() {
  return (
    <>
      <Nav />
      <Router className="app__content">
        <Home path="/" />
        <Company path="jobs/:shortName/" />
        <Job path="jobs/:shortName/:jobCode/" />
      </Router>
    </>
  );
}

export default App;
