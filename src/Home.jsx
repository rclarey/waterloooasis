import React from "react";

import JobTile from "./JobTile";

import "./Home.css";

function Home({ trending }) {
  return (
    <main class="home__container">
      <h2 class="home__subheader">Trending</h2>
      <section class="home__list">
        {trending.map(job => (
          <JobTile key={job.id} job={job} />
        ))}
        <div class="home__eol" />
      </section>
    </main>
  );
}

export default Home;
