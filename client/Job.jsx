import React from 'react';

import JobTile from './JobTile';

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
      <section>
        <div className="job__tabcontainer">
          <h2>Description</h2>
        </div>
        <div className="job__tabcontent">
          {job.description.split('\n').map(p => (
            <p>{p}</p>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Job;
