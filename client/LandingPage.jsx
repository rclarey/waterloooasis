import React, { Suspense, memo } from 'react';
import { Link, Router } from '@reach/router';

import OButton from 'oasisui/OButton.jsx';
import OLink from 'oasisui/OLink.jsx';

import 'LandingPage.css';

function LandingPage() {
  return (
    <main>
      <div className="landingpage__nav-container">
        <div className="landingpage__logo">
          <img src="svg/oasis-white.svg" />
        </div>
        <div className="landingpage__nav-link-container">
          <div className="landingpage__nav-link">
            <OLink
              text="Home"
              light={true}
            />
          </div>
          <div className="landingpage__nav-link">
            <OLink
              text="About"
              light={true}
            />
          </div>
          <div className="landingpage__nav-link">
            <OLink
              text="Team"
              light={true}
            />
          </div>
          <div className="landingpage__nav-link">
            <OLink
              text="Contact Us"
              light={true}
            />
          </div>
        </div>
        <div className="landingpage__nav-login">
          <OButton
            text="Log in"
            light={true}
            alt={true}
          />
        </div>
      </div>
      <div className="landingpage__display">
        <div className="landingpage__display-left">
          <div className="landingpage__jumbo-text">
            The front page of Waterloo Co-op.
          </div>
          <div className="landingpage__sign-up">
            <OButton
              text="Sign up"
              light={true}
              large={true}
            />
          </div>
        </div>
        <div className="landingpage__illustration">
          <img src="svg/landing-illustration.svg" />
        </div>
      </div>
      <div className="landingpage__about">

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
