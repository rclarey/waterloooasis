import React, { Suspense, memo } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

import Spinner from 'shared/Spinner.jsx';
import TabLink from 'shared/TabLink.jsx';

import { post } from 'utils.js';

// TODO (dane): Move Home.css and Profile.css to be shared.
import 'Profile/Profile.css';
import 'Home/Home.css';

async function signOut() {
  try {
    await post('/signout');
    window.location.pathname = '/';
  } catch (e) {
    // TODO: do something about this
  }
}

function Profile({ children }) {
  return (
    <main className="home__container">
      <header className="home__tabs">
        <div className="home__tabpos">
          <TabLink to="/profile" text="My Account" />
          <TabLink to="/profile/privacy" text="Privacy" />
        </div>
      </header>
      <section className="home__tabcontent">
        <Suspense fallback={<Spinner size={75} centre={true} />}>
          {children}
          <div className="home__eol" />
        </Suspense>
      </section>
    </main>
  );
}
Profile.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(Profile);
