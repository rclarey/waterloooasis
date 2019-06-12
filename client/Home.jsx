import React, { Suspense } from 'react';
import { Link } from '@reach/router';
import useFetch from 'fetch-suspense';

import JobTile from './JobTile';
import Spinner from './Spinner';

import './Home.css';

function Home({ trending }) {
  return (
    <main>
      <h2 className="home__subheader">Trending</h2>
      <section className="home__list">
        <Suspense fallback={<Spinner size={75} centre={true} />}>
          <HomeItems trending={trending} />
        </Suspense>
      </section>
    </main>
  );
}

function HomeItems({ trending }) {
  const _ = useFetch('https://jsonplaceholder.typicode.com/comments');
  const _2 = useFetch('https://jsonplaceholder.typicode.com/posts');

  return (
    <>
      {trending.map(job => (
        <Link
          to={`/jobs/${job.company.shortName}/${job.shortCode}`}
          key={job.id}
        >
          <JobTile job={job} />
        </Link>
      ))}
      <div className="home__eol" />
    </>
  );
}

export default Home;
