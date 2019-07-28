import React, { Suspense, memo } from 'react';
import { Link, Router } from '@reach/router';

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
        <div className="landingpage__about-item-light">
          <OButton
            text="Light large alt"
            light={true}
            large={true}
            alt={true}
          />
        </div>
        <div className="landingpage__about-item-light">
          <OButton
            text="Light large CTA"
            light={true}
            large={true}
          />
        </div>
        <div className="landingpage__about-item">
          <OButton
            text="Dark large alt"
            large={true}
            alt={true}
          />
        </div>
        <div className="landingpage__about-item-light">
          <OButton
            text="Light small alt"
            light={true}
            alt={true}
          />
        </div>
        <div className="landingpage__about-item">
          <OButton
            text="Dark small alt"
            alt={true}
          />
        </div>
        <div className="landingpage__about-item-light">
          <OButton
            text="Light small CTA"
            light={true}
          />
        </div>
        <div className="landingpage__about-item">
          <OButton
            text="Dark large cta"
            large={true}
          />
        </div>
        <div className="landingpage__about-item">
          <OButton
            text="Dark small cta"
          />
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
