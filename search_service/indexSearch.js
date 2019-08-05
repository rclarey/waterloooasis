const u = require('shared/util/u');
const { query } = require('shared/util/db.js');
const { Client } = require('@elastic/elasticsearch');

// function jobQuery(whereClause = '') {
//   return `
// select job.*, company.name, company.short_name,
// (select count(*) from comment where job_id = job.id) as comments
// from job inner join company on job.company_id = company.id ${whereClause};`;
// }

// function jsonifyJob(row) {
//   return {
//     company: {
//       name: row.name,
//       shortName: row.short_name,
//     },
//     id: row.id,
//     shortCode: row.short_code,
//     title: row.title,
//     status: row.status,
//     statusStage: row.status_stage,
//     pay: row.pay,
//     description: row.description,
//     squares: 774,
//     commentCount: row.comments,
//   };
// }

async function getJobs() {
  const selectJobs = `
      SELECT job.*, company.name, company.short_name FROM job
      INNER JOIN company ON job.company_id = company.id`;
  const selectRating = `
      SELECT job.id, COUNT(rating) as num_reviewers, SUM(rating) as total_rating
      FROM job LEFT JOIN ratings ON job.id = ratings.job_id
      GROUP BY job.id`;
  const selectComment = `
      SELECT job.id, COUNT(comment.id) as num_comments FROM job
      LEFT JOIN comment ON job.id = comment.job_id
      GROUP BY job.id`;
  const selectFollows = `
      SELECT job.id, COUNT(following.id) as num_follows FROM job
      LEFT JOIN following ON job.id = following.job_id
      GROUP BY job.id`;
  const jobs = await query(selectJobs);
  const ratings = await query(selectRating);
  const comments = await query(selectComment);
  const follows = await query(selectFollows);
  return jobs.map((job, i) => {
    const { num_reviewers, total_rating } = ratings[i];
    const { num_comments } = comments[i];
    const { num_follows } = follows[i];

    const totalRating =
      num_reviewers === 0
        ? 0
        : Number((total_rating / num_reviewers).toPrecision(3));

    const statusString = `${job.status}${
      job.status_round > 1 ? ` (round ${job.status_round})` : ''
    }`;

    return {
      totalRating,
      company: {
        id: job.company_id,
        name: job.name,
        shortName: job.short_name,
      },
      id: job.id,
      shortCode: job.short_code,
      title: job.title,
      status: {
        string: statusString,
        round: job.status_round,
      },
      statusStage: job.status_stage,
      location: job.location,
      description: job.description,
      numReviewers: num_reviewers,
      numComments: num_comments,
      numFollows: num_follows,
    };
  });
}

async function run() {
  const client = new Client({ node: 'http://localhost:9200' });
  const jobs = await getJobs();

  u.log("-> Checking for existing 'jobs' index...");
  const jobsIndexExists = (await client.indices.exists({
    index: 'jobs',
  })).body;

  if (jobsIndexExists) {
    u.log("-> Deleting existing 'jobs' index");
    await client.indices.delete({
      index: 'jobs',
    });
  } else {
    u.log("-> No existing 'jobs' index found.");
  }

  u.log("-> Creating 'jobs' index");
  await client.indices.create({
    index: 'jobs',
    body: {
      mappings: {
        properties: {
          company: {
            type: 'nested',
          },
        },
      },
    },
  });

  u.log('-> Indexing all jobs from db');
  for (const job of jobs) {
    await client.index({
      index: 'jobs',
      body: job,
    });
  }

  u.log('-> Refreshing jobs index');
  await client.indices.refresh({ index: 'jobs' });

  u.log('-> Done.');
  process.exit(0);
}

run();
