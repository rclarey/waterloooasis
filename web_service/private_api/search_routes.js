const expressUtils = require('shared/util/expressUtils');
const { Client } = require('@elastic/elasticsearch');
const u = require('shared/util/u');

const searchRouter = (() => {
  const router = expressUtils.createRouter();

  const client = new Client({ node: 'http://localhost:9200' });

  router.get('/', async (req, res) => {
    const { queryString } = req.query;
    // TODO: remove log statements.
    u.log('******');
    u.log(queryString);

    try {
      const results = (await client.search({
        index: 'jobs',
        body: {
          query: {
            nested: {
              path: 'company',
              query: {
                bool: {
                  must: [
                    { match_phrase_prefix: { 'company.name': queryString } },
                  ],
                },
              },
            },
          },
        },
      })).body.hits.hits;

      // TODO: remove log statements.
      u.log(results);
      res.send(results);
    } catch (e) {
      res.send(e);
    }
  });

  return router;
})();

module.exports = searchRouter;
