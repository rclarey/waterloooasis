import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import useFetch from 'fetch-suspense';

import Comment from 'shared/Comment.jsx';
import JobTile from 'shared/JobTile.jsx';
import Spinner from 'shared/Spinner.jsx';

import 'Job/Job.css';

function Job({ jobCode }) {
  return (
    <main className="job__container">
      <Suspense fallback={<Spinner size={75} centre={true} />}>
        <JobContent shortCode={jobCode} />
      </Suspense>
    </main>
  );
}
Job.propTypes = {
  jobCode: PropTypes.string.isRequired,
};

function JobContent({ shortCode }) {
  const job = useFetch(`http://localhost:3000/api/job/${shortCode}`);

  return (
    <>
      <section className="job__info">
        <img
          className="job__logo"
          width="100px"
          height="100px"
          alt={`${job.company.name} logo`}
          src={`/img/${job.company.shortName}_logo.png`}
        />
        <JobTile job={job} big={true} />
        <h2 className="job__subheader">Description</h2>
        <div className="job__description">
          {job.description.split('\n').map((p, i) => (
            <p key={`desc${i}`}>{p}</p>
          ))}
        </div>
      </section>
      <section className="job__commentsection">
        {job.comments.map((comment, i) => (
          <Comment
            key={comment.id}
            comment={comment}
            last={i === job.comments.length - 1}
          />
        ))}
      </section>
    </>
  );
}
JobContent.propTypes = {
  shortCode: PropTypes.string.isRequired,
};

export default Job;
