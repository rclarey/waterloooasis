const expressUtils = require('shared/util/expressUtils');
const u = require('shared/util/u');
const { query } = require('shared/util/db.js');

const searchRouter = (() => {
  const router = expressUtils.createRouter();

  router.get('/:query', async (req, res) => {
    
    const selectCompanyByQuery = `
      SELECT
        c.name as name,
        c.id as id,
        COUNT(*) as numRatings,
        SUM(rating) as totalRating
      FROM company as c
      INNER JOIN review as r
      ON c.id = r.company_id
      WHERE c.name LIKE ?
      GROUP BY c.id, c.name
    `;

    const selectJobs = `
      SELECT job.*, company.name, company.short_name FROM job
      INNER JOIN company ON job.company_id = company.id
      WHERE job.title LIKE ? OR company.name LIKE ?`;
    const selectRating = `
      SELECT job.id, COUNT(rating) as num_reviewers, SUM(rating) as total_rating FROM job
      LEFT JOIN ratings ON job.id = ratings.job_id
      INNER JOIN company ON job.company_id = company.id
      WHERE job.title LIKE ? OR company.name LIKE ?
      GROUP BY job.id ORDER BY job.id`;
    const selectComment = `
      SELECT job.id, COUNT(comment.id) as num_comments FROM job
      LEFT JOIN comment ON job.id = comment.job_id
      INNER JOIN company ON job.company_id = company.id
      WHERE job.title LIKE ? OR company.name LIKE ?
      GROUP BY job.id ORDER BY job.id`;
    const selectFollows = `
      SELECT job.id, COUNT(following.id) as num_follows FROM job
      LEFT JOIN following ON job.id = following.job_id
      INNER JOIN company ON job.company_id = company.id
      WHERE job.title LIKE ? OR company.name LIKE ?
      GROUP BY job.id ORDER BY job.id`;

    try {
      if (!req.params.query) {
        throw { badRequest: true };
      }

      const companyOverview = await query(selectCompanyByQuery, [`%${req.params.query}%`]);

      const jobs = await query(selectJobs, [`%${req.params.query}%`, `%${req.params.query}%`]);
      const ratings = await query(selectRating, [`%${req.params.query}%`, `%${req.params.query}%`]);
      const comments = await query(selectComment, [`%${req.params.query}%`, `%${req.params.query}%`]);
      const follows = await query(selectFollows, [`%${req.params.query}%`, `%${req.params.query}%`]);

      const jobsJson = jobs.map((job, i) => {
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

      res.status(200).json({
        companies: companyOverview,
        jobs: jobsJson,
      });
    } catch(e) {
      res.status(500).json({ reason: 'Something went wrong' });
    }
  });

  return router;
})();


// ************
// TODO: ElasticSearch! Some old boilerplate code below.
// ************

// const { Client } = require('@elastic/elasticsearch');
// const searchRouter = (() => {
//   const router = expressUtils.createRouter();

//   const client = new Client({ node: 'http://localhost:9200' });

//   router.get('/', async (req, res) => {
//     const { queryString } = req.query;
//     // TODO: remove log statements.
//     u.log('******');
//     u.log(queryString);

//     try {
//       const results = (await client.search({
//         index: 'jobs',
//         body: {
//           query: {
//             nested: {
//               path: 'company',
//               query: {
//                 bool: {
//                   must: [
//                     { match_phrase_prefix: { 'company.name': queryString } },
//                   ],
//                 },
//               },
//             },
//           },
//         },
//       })).body.hits.hits;

//       // TODO: remove log statements.
//       u.log(results);
//       res.send(results);
//     } catch (e) {
//       res.send(e);
//     }
//   });

//   return router;
// })();

module.exports = searchRouter;
