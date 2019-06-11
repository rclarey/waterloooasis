import React from 'react';
import { Link } from '@reach/router';

import JobTile from './JobTile';

import './Home.css';

function Home({ trending }) {
  return (
    <main>
      <h2 className="home__subheader">Trending</h2>
      <section className="home__list">
        {trending.map(job => (
          <Link
            to={`/jobs/${job.company.shortName}/${job.shortCode}`}
            key={job.id}
          >
            <JobTile job={job} />
          </Link>
        ))}
        <div className="home__eol" />
      </section>
    </main>
  );
}

export default Home;
