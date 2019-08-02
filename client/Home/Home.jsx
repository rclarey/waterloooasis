import React, { Suspense, memo } from 'react';
import PropTypes from 'prop-types';

import Spinner from 'shared/Spinner.jsx';
import TabLink from 'shared/TabLink.jsx';

import 'Home/Home.css';

function Home({ children }) {
  return (
    <main className="home__container">
      <header className="home__tabs">
        <div className="home__tabpos">
          <TabLink to="/trending" text="Trending" />
          <TabLink to="/myjobs" text="My Jobs" />
          <TabLink to="/mycomments" text="My Comments" />
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
Home.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(Home);
