import React from "react";

import JobTile from "./JobTile";

import "./Home.css";

function Home({ trending }) {
  return (
    <main className="home__container">
      <h2 className="home__subheader">Trending</h2>
      <section className="home__list">
        {trending.map(job => (
          <JobTile key={job.id} job={job} />
        ))}
        <div className="home__eol" />
      </section>
    </main>
  );
}

export default Home;
