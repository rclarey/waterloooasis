const { query } = require('shared/util/db.js');

async function getJob(req, res) {
  const queryStr = `
    SELECT job.*, company.name, company.short_name, company.id as company_id
    FROM job INNER JOIN company ON job.company_id = company.id
    WHERE job.short_code = ?`;

  try {
    if (!req.params.shortCode) {
      throw { badRequest: true };
    }

    const job = (await query(queryStr, [req.params.shortCode]))[0];
    if (!job) {
      throw { badRequest: true };
    }

    const rating =
      job.num_reviewers === 0
        ? 0
        : Number((job.total_rating / job.num_reviewers).toPrecision(3));

    res.status(200).json({
      rating,
      company: {
        id: job.company_id,
        name: job.name,
        shortName: job.short_name,
      },
      id: job.id,
      shortCode: job.short_code,
      title: job.title,
      status: job.status,
      statusStage: job.status_stage,
      location: job.location,
      description: job.description,
      numReviewers: job.num_reviewers,
      numComments: job.num_comments,
      numFollows: job.num_follows,
    });
  } catch (err) {
    if (err.badRequest) {
      res.status(400).json({ reason: 'Bad request' });
    } else {
      res.status(500).json({ reason: 'Something went wrong' });
    }
  }
}

function setupJobs(router) {
  router.get('/api/jobs/:shortCode', getJob);
}

module.exports = setupJobs;
