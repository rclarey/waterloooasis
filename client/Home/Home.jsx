import React, { Suspense, memo } from 'react';
import PropTypes from 'prop-types';

import Spinner from 'shared/Spinner.jsx';
import OLink from 'oasisui/OLink.jsx';
import { Link } from '@reach/router';
import useFetch from 'fetch-suspense';
import JobTile from 'shared/JobTile.jsx';

import 'Home/Home.css';

function Home({ children }) {
  return (
    <main className="home__container">
      <header className="home__tabs">
        <div className="home__tabpos">
          <TabLink to="/trending" text="Trending" />
          <TabLink to="/companytrending" text="Companies" />
          <TabLink to="/myjobs" text="My Jobs" />
          <TabLink to="/myreviews" text="My Reviews" />
          {/*<TabLink to="/mycomments" text="My Comments" />*/}
        </div>
      </header>
      <section className="home__tabcontent">
        <div className="home__scrollpositioner">
          <Suspense fallback={<Spinner size={75} centre={true} />}>
            {children}
          </Suspense>
        </div>
        <div className="home__eol" />
      </section>
    </main>
  );
}
Home.propTypes = {
  children: PropTypes.node.isRequired,
};

function TabLink(props) {
  return (
    <div className="home__tabheader">
      <OLink
        large={true}
        activeLinking={true}
        {...props}
        activeClassName="home__tabheader--active"
      />
    </div>
  );
}

export default memo(Home);
