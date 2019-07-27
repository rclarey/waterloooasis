import React, { Suspense, memo } from 'react';
import { Link, Router } from '@reach/router';

import Spinner from 'shared/Spinner.jsx';

import 'LandingPage.css';

function LandingPage() {
  return (
    <main>
      <div className="landingpage__nav-container">
        <div className="landingpage__nav-item">
          <img src="svg/oasis-white.svg" />
        </div>
        <div className="landingpage__nav-item landingpage__nav-link">
          Home
        </div>
        <div className="landingpage__nav-item landingpage__nav-login">
          Login
        </div>
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
