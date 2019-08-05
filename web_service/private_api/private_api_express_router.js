const cookieParser = require('cookie-parser');

const expressUtils = require('shared/util/expressUtils');
const { pool, query, timeString } = require('shared/util/db.js');

const setupJobs = require('web_service/private_api/jobs.js');
const searchRouter = require('web_service/private_api/search_routes');
const setupComments = require('web_service/private_api/comments.js');

function serveApp(_, res) {
  res.sendFile('web_service/static/app.html', { root: '.' });
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

function privateApiExpressRouter(authenticate, authenticateWithRedirect) {
  const router = expressUtils.createRouter();

  router.use(cookieParser(process.env.COOKIE_SECRET));
  router.use((req, res, next) => {
    if (req.path.slice(0, 4) === '/api') {
      authenticate(req, res, next);
    } else {
      authenticateWithRedirect(req, res, next);
    }
  });

  setupComments(router);
  setupJobs(router);

  router.get('/trending', serveApp);
  router.get('/myjobs', serveApp);
  router.get('/mycomments', serveApp);
  router.get('/jobs/*', serveApp);
  router.get('/jobs/*/*', serveApp);

  router.use('/api/search', searchRouter);

  router.get('/api/users', (_, res) => {
    const select_query = 'SELECT * FROM waterloo_oasis_dev.user';
    pool.query(select_query, function(err, rows) {
      if (err) throw err;
      res.send(rows);
    });
  });

  // ***** HOME API *****
  // TRENDING
  // TODO: add some pagination, and more sophisticated means of organizing trending
  router.get('/api/trending', async (_, res) => {
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

    try {
      const jobs = await query(selectJobs);
      const ratings = await query(selectRating);
      const comments = await query(selectComment);
      const follows = await query(selectFollows);
      res.status(200).json(
        jobs.map((job, i) => {
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
        }),
      );
    } catch (err) {
      res.status(500).json({ reason: 'Something went wrong' });
    }
  });

  // MYJOBS
  router.get('/api/myjobs', async (req, res) => {
    const selectJobs = `
      SELECT job.*, company.name, company.short_name FROM job
      INNER JOIN company ON job.company_id = company.id
      INNER JOIN following on job.id = following.job_id AND following.user_id = ?`;
    const selectRating = `
      SELECT job.id, COUNT(rating) as num_reviewers, SUM(rating) as total_rating
      FROM job LEFT JOIN ratings ON job.id = ratings.job_id
      INNER JOIN following on job.id = following.job_id AND following.user_id = ?
      GROUP BY job.id`;
    const selectComment = `
      SELECT job.id, COUNT(comment.id) as num_comments FROM job
      LEFT JOIN comment ON job.id = comment.job_id
      INNER JOIN following on job.id = following.job_id AND following.user_id = ?
      GROUP BY job.id`;
    const selectFollows = `
      SELECT job.id, COUNT(following.id) as num_follows FROM job
      LEFT JOIN following as f_count ON job.id = f_count.job_id
      INNER JOIN following on job.id = following.job_id AND following.user_id = ?
      GROUP BY job.id`;
    try {
      const userId = req.user.id;
      const jobs = await query(selectJobs, [userId]);
      const ratings = await query(selectRating, [userId]);
      const comments = await query(selectComment, [userId]);
      const follows = await query(selectFollows, [userId]);
      res.status(200).json(
        jobs.map((job, i) => {
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
        }),
      );
    } catch (e) {
      res.status(500).json({ reason: 'Something went wrong' });
    }
  });

  // MYCOMMENTS
  router.get('/api/mycomments', (req, res) => {
    const q = `select comment.*, user.username 
                from comment inner join user on comment.author_id = user.id 
                where author_id = ? order by date_time desc;`;
    pool.query(q, [req.user.id], (err, rows) => {
      if (err) {
        return;
      }
      const comments = [];
      rows.forEach(row => {
        comments.push({
          ...row,
          author: {
            name: row.username,
          },
          timeString: timeString(row.date_time),
          replies: [],
        });
      });
      res.json(comments);
    });
  });

  // TODO: MOVE FAVOURITING SOMEWHERE ELSE?
  router.post('/api/favourites', (req, res) => {
    /*
    req.body = 
    {
      user_id : int
      job_id : int
      is_favourite: bool
    }
    */

    if (
      !(
        'user_id' in req.body &&
        'job_id' in req.body &&
        'is_favourite' in req.body
      )
    ) {
      res.sendStatus(400);
    }

    let query =
      'DELETE FROM waterloo_oasis_dev.user_favourite_jobs WHERE user_id = ? AND job_id = ?';
    if (req.body.is_favourite) {
      query =
        'INSERT INTO waterloo_oasis_dev.user_favourite_jobs (user_id, job_id) VALUES(?, ?);';
    }
    pool.query(query, [req.body.user_id, req.body.job_id], function(err) {
      if (err) {
        res.sendStatus(400);
      } else {
        /* Manage your results here */
        res.sendStatus(200);
      }
    });
  });

  // ***** END OF HOME API *****

  // router.get('/api/job/:shortCode', (req, res) => {
  //   const jobq = jobQuery('where job.short_code = ?');
  //   pool.query(jobq, [req.params.shortCode], (jobErr, [job]) => {
  //     if (jobErr) {
  //       return;
  //     }

  //     const commentq =
  //       'select comment.*, user.username from comment inner join user on comment.author_id = user.id where job_id = ? order by id;';
  //     pool.query(commentq, [job.id], (commentErr, rows) => {
  //       if (commentErr) {
  //         return;
  //       }

  //       const map = {};
  //       const replies = [];
  //       const comments = [];
  //       rows.forEach(row => {
  //         const comment = {
  //           ...row,
  //           author: {
  //             name: row.username,
  //           },
  //           timeString: timeString(row.date_time),
  //           replies: [],
  //         };
  //         map[row.id] = comment;
  //         if (comment.parent_id !== null) {
  //           replies.push(comment);
  //         } else {
  //           comments.push(comment);
  //         }
  //       });
  //       replies.forEach(reply => {
  //         map[reply.parent_id].replies.push(reply);
  //       });

  //       res.json({
  //         ...jsonifyJob(job),
  //         commentCount: rows.length,
  //         comments,
  //       });
  //     });
  //   });
  // });

  /**
  FOR NOW: Pass in username, rest will be set values
  */
  router.post('/api/users', (req, res) => {
    if (!('username' in req.body)) {
      res.sendStatus(400);
    }

    const insert_query =
      "INSERT INTO waterloo_oasis_dev.user (username, email, hash, salt, log_rounds) VALUES(?, 'email', 'hash', 'salt', 1);";
    pool.query(insert_query, [req.body.username], function(err) {
      if (err) {
        res.sendStatus(400);
      } else {
        /* Manage your results here */
        res.sendStatus(200);
      }
    });
  });

  return router;
}

module.exports = privateApiExpressRouter;
