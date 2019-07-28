import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import 'regenerator-runtime/runtime';

import FourOhFour from 'shared/FourOhFour.jsx';
import SignIn from 'public/SignIn.jsx';
import SignUp from 'public/SignUp.jsx';

import 'global.css';

ReactDOM.render(
  <>
    <Router>
      <SignIn path="/signin" />
      <SignUp path="/signup" />
      <FourOhFour default />
    </Router>
  </>,
  document.getElementById('app'),
);
