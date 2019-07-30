import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import 'regenerator-runtime/runtime';

import FourOhFour from 'shared/FourOhFour.jsx';
import LandingPage from 'public/LandingPage.jsx';
import SignIn from 'public/SignIn.jsx';
import SignUp from 'public/SignUp.jsx';
import VerifyEmail from 'public/VerifyEmail.jsx';

import 'global.css';

function Public() {
  const [email, setEmail] = useState(null);

  return (
    <>
      <Router>
        <LandingPage path="/" />
        <SignIn path="/signin" />
        <SignUp path="/signup" setEmail={setEmail} />
        <VerifyEmail path="/verify" email={email} />
        <FourOhFour default />
      </Router>
    </>
  );
}

ReactDOM.render(<Public />, document.getElementById('app'));
