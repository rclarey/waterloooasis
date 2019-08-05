const { query } = require('shared/util/db.js');

async function getJob(req, res) {
  const selectJob = `
    SELECT job.*, company.name, company.short_name, company.id as company_id,
    ratings.rating, (following.id IS NOT NULL) as following FROM job
    INNER JOIN company ON job.company_id = company.id
    LEFT JOIN ratings on job.id = ratings.job_id AND ratings.user_id = ?
    LEFT JOIN following on job.id = following.job_id AND following.user_id = ?
    WHERE job.short_code = ?`;
  const selectRating = `
    SELECT COUNT(rating) as num_reviewers, SUM(rating) as total_rating
    FROM ratings WHERE job_id = ?`;
  const selectOther = `
    SELECT (SELECT COUNT(*) FROM comment WHERE job_id = ?) as num_comments,
    (SELECT COUNT(*) FROM following WHERE job_id = ?) as num_follows`;

  try {
    if (!req.params.shortCode) {
      throw { badRequest: true };
    }

    const userId = req.user.id;
    const job = (await query(selectJob, [
      userId,
      userId,
      req.params.shortCode,
    ]))[0];
    if (!job) {
      throw { badRequest: true };
    }
    const { num_reviewers, total_rating } = (await query(selectRating, [
      job.id,
    ]))[0];
    const { num_comments, num_follows } = (await query(selectOther, [
      job.id,
      job.id,
    ]))[0];

    const totalRating =
      num_reviewers === 0
        ? 0
        : Number((total_rating / num_reviewers).toPrecision(3));

    const statusString = `${job.status}${
      job.status_round > 1 ? ` (round ${job.status_round})` : ''
    }`;

    res.status(200).json({
      totalRating,
      rating: job.rating,
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
      following: !!job.following,
    });
  } catch (err) {
    if (err.badRequest) {
      res.status(400).json({ reason: 'Bad request' });
    } else {
      res.status(500).json({ reason: 'Something went wrong' });
    }
  }
}

async function toggleFollowed(req, res) {
  const existingFollow =
    'SELECT count(*) FROM following WHERE user_id = ? AND job_id = ?';
  const insertFollow = 'INSERT INTO following (user_id, job_id) VALUES(?, ?)';
  const deleteFollow = 'DELETE FROM following WHERE user_id = ? AND job_id = ?';

  try {
    const { value: doFollow, jobId } = req.body;
    const userId = req.user.id;

    const followed =
      (await query(existingFollow, [userId, jobId]))[0]['count(*)'] > 0;

    if (doFollow && !followed) {
      await query(insertFollow, [userId, jobId]);
    } else if (!doFollow && followed) {
      await query(deleteFollow, [userId, jobId]);
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ reason: 'Something went wrong' });
  }
}

const statusStages = {
  'Applications available': 1,
  'Coding challenge out': 1,
  'Applications closed': 2,
  'Interview selections complete': 2,
  'Rankings out': 3,
  'Host matching': 3,
  'Host matching complete': 3,
  'Applications cancelled': 3,
};

async function updateStatus(req, res) {
  const updateQuery = `UPDATE job SET status = ?, status_stage = ?, status_round = ? WHERE id = ?`;

  try {
    const { jobId, status, round } = req.body;
    await query(updateQuery, [status, statusStages[status], round, jobId]);
    res.status(200).json();
  } catch (e) {
    res.status(500).json({ reason: 'Seomthing went wrong' });
  }
}

async function rateJob(req, res) {
  const deleteQuery = `DELETE FROM ratings WHERE job_id = ? AND user_id = ?`;
  const insertQuery = `INSERT INTO ratings (job_id, user_id, rating) VALUES(?, ?, ?)`;

  try {
    const { jobId, rating } = req.body;
    const userId = req.user.id;
    await query(deleteQuery, [jobId, userId]);
    await query(insertQuery, [jobId, userId, rating]);

    res.status(200).json();
  } catch (e) {
    res.status(500).json({ reason: 'Seomthing went wrong' });
  }
}

function setupJobs(router) {
  router.get('/api/jobs/:shortCode', getJob);
  router.post('/api/follow', toggleFollowed);
  router.post('/api/updatestatus', updateStatus);
  router.post('/api/ratejob', rateJob);
}

module.exports = setupJobs;
