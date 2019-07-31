const expressUtils = require('shared/util/expressUtils');
const { query } = require('shared/util/db.js');
const { Client } = require('@elastic/elasticsearch');

function jobQuery(whereClause = '') {
  return `
select job.*, company.name, company.short_name,
(select count(*) from comment where job_id = job.id) as comments
from job inner join company on job.company_id = company.id ${whereClause};`;
}

function jsonifyJob(row) {
  return {
    company: {
      name: row.name,
      shortName: row.short_name,
    },
    id: row.id,
    shortCode: row.short_code,
    title: row.title,
    status: row.status,
    statusStage: row.status_stage,
    pay: row.pay,
    description: row.description,
    squares: 774,
    commentCount: row.comments,
  };
}

async function getJobs() {
  const q = jobQuery();
  const rows = await query(q);
  return rows.map(jsonifyJob);
}

async function run() {
  const client = new Client({ node: 'http://localhost:9200' });
  const jobs = await getJobs();

  await client.indices.delete({
    index: 'jobs',
  });

  await client.indices.create({
    index: 'jobs',
    body: {
      mappings: {
        properties: {
          company: {
            type: 'nested',
          }
        }
      }
    }
  });

  for (const job of jobs) {
    await client.index({
      index: 'jobs',
      body: job,
    });
  }

  await client.indices.refresh({ index: 'jobs' });
};

run();
