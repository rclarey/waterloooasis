const expressUtils = require('shared/util/expressUtils');
const { pool } = require('shared/util/db.js');
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

const searchRouter = (() => {
  const router = expressUtils.createRouter();

  const client = new Client({ node: 'http://localhost:9200' });

  router.get('/', async (req, res) => {
    const { queryString } = req.query;
    console.log('******');
    console.log(queryString);

    const { body } = await client.search({
      index: 'jobs',
      body: {
        query: {
          nested: {
            path: 'company',
            query: {
              bool: {
                must: [
                  { match: { 'company.name': queryString } }
                ]
              }
            }
          }
        }
      }
    });

    console.log(body.hits.hits);

    res.json(body.hits.hits);
  });

  return router;
})();

module.exports = searchRouter;
