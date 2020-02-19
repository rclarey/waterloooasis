import React, { Suspense, memo } from 'react';
import PropTypes from 'prop-types';

import Spinner from 'shared/Spinner.jsx';
import OLink from 'oasisui/OLink.jsx';
import { Link } from '@reach/router';
import useFetch from 'fetch-suspense';
import JobTile from 'shared/JobTile.jsx';

import 'Home/Home.css';

function Home({ children, query }) {
  const body = query === '' ? <>{children}</> : <SearchResults query={query} />;

  return (
    <main className="home__container">
      <header className="home__tabs">
        <div className="home__tabpos">
          <TabLink to="/trending" text="Trending" />
          <TabLink to="/myjobs" text="My Jobs" />
          <TabLink to="/myreviews" text="My Reviews" />
          {/*<TabLink to="/mycomments" text="My Comments" />*/}
        </div>
      </header>
      <section className="home__tabcontent">
        <div className="home__scrollpositioner">
          <Suspense fallback={<Spinner size={75} centre={true} />}>
            {body}
          </Suspense>
        </div>
        <div className="home__eol" />
      </section>
    </main>
  );
}
Home.propTypes = {
  children: PropTypes.node.isRequired,
  query: PropTypes.string,
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

function SearchResults({ query }) {
  const results = useFetch(`/api/search?queryString=${query}`);
  const processedResults = results.map(result => result._source);

  return (
    <div>
      {processedResults.map(job => (
        <Link
          to={`/jobs/${job.company.shortName}/${job.shortCode}`}
          key={job.id}
        >
          <JobTile job={job} />
        </Link>
      ))}
      <div className="trending__overlay" />
    </div>
  );
}
SearchResults.propTypes = {
  query: PropTypes.string,
};

export default memo(Home);
