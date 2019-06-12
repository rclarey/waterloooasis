import React, { Suspense } from 'react';
import useFetch from 'fetch-suspense';

import Comment from './Comment';
import JobTile from './JobTile';
import Spinner from './Spinner';

import './Job.css';

function Job({ job, shortName, jobCode }) {
  return (
    <main>
      <header className="job__header">
        <img
          className="job__logo"
          width="100px"
          height="100px"
          alt={`${job.company.name} logo`}
          src="/img/mercari_logo.png"
        />
        <div className="job__jobtile">
          <JobTile job={job} big={true} />
        </div>
      </header>
      <Suspense fallback={<Spinner size={75} centre={true} />}>
        <JobContent job={job} />
      </Suspense>
    </main>
  );
}

function JobContent({ job }) {
  const _ = useFetch('https://jsonplaceholder.typicode.com/photos');
  const _2 = useFetch('https://jsonplaceholder.typicode.com/todos');

  return (
    <>
      <section className="job__infocontainer">
        <h2 className="job__subheader">Description</h2>
        <div className="job__info">
          {job.description.split('\n').map((p, i) => (
            <p key={`desc${i}`}>{p}</p>
          ))}
        </div>
      </section>
      <section>
        {job.comments.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </section>
    </>
  );
}

export default Job;
