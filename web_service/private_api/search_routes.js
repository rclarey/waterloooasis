const expressUtils = require('shared/util/expressUtils');
const u = require('shared/util/u');
const { query } = require('shared/util/db.js');

const searchRouter = (() => {
  const router = expressUtils.createRouter();

  router.get('/:query', async (req, res) => {
    u.log('HIT ENDPOINT!');
    
    const selectCompanyByQuery = `
      SELECT
        c.name as name,
        COUNT(*) as numRatings,
        SUM(rating) as totalRating
      FROM company as c
      INNER JOIN review as r
      ON c.id = r.company_id
      WHERE LOWER(c.name) LIKE ?
      GROUP BY c.id, c.name
    `;

    try {
      if (!req.params.query) {
        throw { badRequest: true };
      }

      const companyOverview = await query(selectCompanyByQuery, [`%${req.params.query}%`]);

      res.status(200).json(companyOverview);
    } catch(e) {
      u.log(e);
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
