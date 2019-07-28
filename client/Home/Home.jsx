import React, { Suspense, memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import Spinner from 'shared/Spinner.jsx';

import 'Home/Home.css';

function Home({ children }) {
  return (
    <main className="home__container">
      <header className="home__tabs">
        <div className="home__tabpos">
          <TabLink to="/trending">
            <h2>Trending</h2>
          </TabLink>
          <TabLink to="/myjobs">
            <h2>My Jobs</h2>
          </TabLink>
          <TabLink to="/mycomments">
            <h2>My Comments</h2>
          </TabLink>
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

export default memo(Home);
