import React, { Suspense, memo } from 'react';
import { Link, Router } from '@reach/router';

import Spinner from 'shared/Spinner.jsx';
import OButton from 'oasisui/OButton.jsx';

import 'LandingPage.css';

function LandingPage() {
  return (
    <main>
      <div className="landingpage__nav-container">
        <div className="landingpage__logo">
          <img src="svg/oasis-white.svg" />
        </div>
        <div className="landingpage__nav-link-container">
          <div className="landingpage__nav-link">Home</div>
          <div className="landingpage__nav-link">About</div>
          <div className="landingpage__nav-link">Team</div>
          <div className="landingpage__nav-link">Contact Us</div>
        </div>
        <div className="landingpage__nav-login">
          <OButton
            text="Log in"
          />
        </div>
      </div>
      <div className="landingpage__display">
      </div>
    </main>
  );
}

function TabLink(props) {
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => ({
        className: `home__tabheader${
          isCurrent ? ' home__tabheader--active' : ''
        }`,
      })}
    />
  );
}

export default memo(LandingPage);
