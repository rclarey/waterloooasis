const cookieParser = require('cookie-parser');

const expressUtils = require('shared/util/expressUtils');
const { pool, query, timeString } = require('shared/util/db.js');

const setupJobs = require('web_service/private_api/jobs.js');
const searchRouter = require('web_service/private_api/search_routes');
const setupComments = require('web_service/private_api/comments.js');

function serveApp(_, res) {
  res.sendFile('web_service/static/app.html', { root: '.' });
}

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
  router.get('/following', serveApp);
  router.get('/myreviews', serveApp);
  router.get('/writereview', serveApp);
  router.get('/mycomments', serveApp);
  router.get('/search', serveApp);
  router.get('/jobs/*', serveApp);
  router.get('/jobs/*/*', serveApp);
  router.get('/company/*', serveApp);

  // TODO: use ElasticSearch
  router.use('/api/search', searchRouter);

  router.get('/api/users', (_, res) => {
    const select_query = 'SELECT * FROM waterloo_oasis_dev.user';
    pool.query(select_query, function(err, rows) {
      if (err) throw err;
      res.send(rows);
    });
  });

  /* ******* DEPRECATING ******* */
  /*
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
      GROUP BY job.id ORDER BY job.id`;
    const selectComment = `
      SELECT job.id, COUNT(comment.id) as num_comments FROM job
      LEFT JOIN comment ON job.id = comment.job_id
      GROUP BY job.id ORDER BY job.id`;
    const selectFollows = `
      SELECT job.id, COUNT(following.id) as num_follows FROM job
      LEFT JOIN following ON job.id = following.job_id
      GROUP BY job.id ORDER BY job.id`;

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
  */

  // MYREVIEWS
  router.get('/api/myreviews', async (req, res) => {
    const selectJobs = `
      SELECT review.*, company.*
      FROM review AS review
      INNER JOIN company AS company ON review.company_id = company.id
      WHERE review.user_id = ?`;

    try {
      const userId = req.user.id;

      const reviews = await query(selectJobs, [userId]);

      res.status(200).json(reviews);
    } catch(e) {
      res.status(500).json({ reason: 'Something went wrong' });
    }
  })

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

  // TODO: Finish /api/review
  router.post('/api/review', async (req, res) => {
    const body = req.body;
    const user_id = req.user.id;

    const faculties = [
      'AHS',
      'ART',
      'ENG',
      'ENV',
      'MATH',
      'SCI',
    ];
    if (!(faculties.includes(body.faculty))) {
      res.status(400).json({ reason: 'Invalid faculty.' });
      return;
    }

    const studyTerms = [
      '1A',
      '1B',
      '2A',
      '2B',
      '3A',
      '3B',
      '4A',
      '4B',
    ];
    if (!(studyTerms.includes(body.term))) {
      res.status(400).json({ reason: 'Invalid study term.' });
      return;
    }

    const applicationSources = [
      'Jobmine/WaterlooWorks',
      'Referral',
      'External Job Board',
      'Job Fair',
      'Company Website',
      'Cold Email',
      'Other',
    ];
    if (!(applicationSources.includes(body.appSource))) {
      res.status(400).json({ reason: 'Invalid application source.' });
      return;
    }

    if (body.company.length < 1 || body.company.length > 128) {
      res.status(400).json({ reason: 'Invalid company.' });
      return;
    }

    if (body.position.length < 1 || body.position.length > 128) {
      res.status(400).json({ reason: 'Invalid position.' });
      return;
    }

    if (body.city.length < 1 || body.city.length > 32) {
      res.status(400).json({ reason: 'Invalid city.' });
      return;
    }

    const seasons = [
      'Winter',
      'Summer',
      'Fall'
    ];

    if (!(seasons.includes(body.season))) {
      res.status(400).json({ reason: 'Invalid season.' });
      return;
    }


    // TODO: fix this later
    const years = [
      '2019',
      '2018',
      '2017',
      '2016',
      '2015',
      '2014',
      '2013',
      '2012',
      '2011',
      '2010',
    ];

    if (!(years.includes(body.year))) {
      res.status(400).json({ reason: 'Invalid year.' });
      return;
    }

    const states = ['1', '2', '3'];

    if (!(states.includes(body.interviewState))) {
      res.status(400).json({ reason: 'Invalid interview state.' });
      return;
    }

    if (!(states.includes(body.internshipState))) {
      res.status(400).json({ reason: 'Invalid internship state.' });
      return;
    }

    if (body.recruitmentExperience.length > 512) {
      res.status(400).json({ reason: 'Recruitment experience is too long.' });
      return;
    }

    if (body.interviewExperience.length > 512) {
      res.status(400).json({ reason: 'Interview experience is too long.' });
      return;
    }

    if (body.internshipExperience.length > 512) {
      res.status(400).json({ reason: 'Internship experience is too long.' });
      return;
    }

    if (body.rejectInternshipExperience.length > 512) {
      res.status(400).json({ reason: 'Reason for rejecting an internship offer is too long.' });
      return;
    }

    if ( !isNaN(parseInt(body.salary)) && parseInt(body.salary) < 0) {
      res.status(400).json({ reason: 'Negative salary entered.' });
      return;
    }

    const ratings = [1, 2, 3, 4, 5];

    if (!(ratings.includes(body.rating))) {
      res.status(400).json({ reason: 'Invalid rating.' });
      return;
    }

    try {
      // This is terrible
      const insertCompanyQuery = `
        INSERT IGNORE INTO company (name)
        VALUES (?)
      `;

      await query(insertCompanyQuery, [body.company.trim()]);

      const selectCompanyQuery = `
        SELECT *
        FROM company
        WHERE name = ?
      `;

      const companyList = await query(selectCompanyQuery, [body.company.trim()]);

      if (!companyList) {
        throw {};
      }

      const company = companyList[0];

      const insertReviewQuery = `
        INSERT INTO review (
          user_id,
          company_id,
          position,
          faculty,
          term,
          year,
          season,
          city,
          app_source,
          recruitment_review,
          interview_review,
          internship_review,
          internship_state,
          interview_state,
          rating,
          monthly_salary,
          reject_internship_review
        ) VALUES ( ? , ? , ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      console.log(body);

      await query(insertReviewQuery, [
        user_id,
        company.id,
        body.position,
        body.faculty,
        body.term,
        parseInt(body.year),
        body.season,
        body.city,
        body.appSource,
        body.recruitmentExperience,
        body.interviewExperience,
        body.internshipExperience,
        parseInt(body.internshipState),
        parseInt(body.interviewState),
        parseInt(body.rating),
        isNaN(parseInt(body.salary)) ? 0 : parseInt(body.salary),
        body.rejectInternshipExperience
      ]);

      res.status(201).json({ reason: 'Success' });

    } catch (e) {
      console.log(e);
      res.status(400).json({ reason: 'Something went wrong' });
    }
  });

  // Trending Companies
  router.get('/api/trending', async (req, res) => {
    const selectCompanyTrending = `
      SELECT c.id as id, c.name as name, COUNT(*) as numRatings, SUM(rating) as totalRating
      FROM company as c
      INNER JOIN review as r
      ON c.id = r.company_id
      GROUP BY c.id, c.name
      LIMIT 150
    `;

    try {

      const companyTrending = await query(selectCompanyTrending, []);

      res.status(200).json(companyTrending);
    } catch(e) {
      res.status(500).json({ reason: 'Something went wrong' });
    }
  });

  // Companies that the user is following
  router.get('/api/following', async (req, res) => {
    const selectFollowingCompanies = `
      SELECT c.id as id, c.name as name, COUNT(*) as numRatings, SUM(rating) as totalRating
      FROM company as c, review as r, following as f
      WHERE
        c.id = r.company_id
        AND f.company_id = c.id
        AND f.user_id = ?
      GROUP BY c.id, c.name
    `;

    try {
      const userId = req.user.id;

      const followingCompanies = await query(selectFollowingCompanies, [userId]);

      res.status(200).json(followingCompanies);
    } catch(e) {
      res.status(500).json({ reason: 'Something went wrong' });
    }
  });

  // Set a company to be followed or unfollowed by a user
  router.post('/api/follow/:id', async (req, res) => {
    try {
      if (
        !(
          'value' in req.body
        )
      ) {
        res.status(400).json({ reason: 'No value was passed.' });
        return;
      }

      const value = req.body.value;

      const companyId = parseInt(req.params.id);

      const userId = req.user.id;
      let queryValue = "";

      if (value) {
        queryValue = `
          INSERT IGNORE INTO following (user_id, company_id) VALUES (? , ?)
        `;
      } else {
        queryValue = `
          DELETE FROM following WHERE user_id = ? AND company_id = ?
        `;
      }

      const followingCompanies = await query(queryValue, [userId, companyId]);

      res.status(200).json(followingCompanies);
    } catch(e) {
      res.status(500).json({ reason: 'Something went wrong' });
    }
  });

  // Check to see if a user follows that company
  router.get('/api/follow/:id', async (req, res) => {
    try {

      const companyId = parseInt(req.params.id);
      const userId = req.user.id;
      const queryValue = `
         SELECT * FROM following WHERE user_id = ? AND company_id = ?
       `;


      const followingCompany = await query(queryValue, [userId, companyId]);

      res.status(200).json(followingCompany);
    } catch(e) {
      res.status(500).json({ reason: 'Something went wrong' });
    }
  });

  // Company
  router.get('/api/company/:id', async (req, res) => {
      const selectCompany = `
        SELECT
          c.name as name,
          COUNT(*) as numRatings,
          SUM(rating) as totalRating
        FROM company as c
        INNER JOIN review as r
        ON c.id = r.company_id
        WHERE c.id = ?
        GROUP BY c.id, c.name
      `;

      try {
        if (!req.params.id) {
          throw { badRequest: true };
        }

        const companyOverview = await query(selectCompany, [req.params.id]);

        res.status(200).json(companyOverview);
      } catch(e) {
        res.status(500).json({ reason: 'Something went wrong' });
      }
    });

  // List of All Companies
    router.get('/api/company', async (req, res) => {
        const selectCompany = `
          SELECT
            c.name
          FROM company as c
        `;

        try {

          const companies = await query(selectCompany, []);

          res.status(200).json(companies);
        } catch(e) {
          res.status(500).json({ reason: 'Something went wrong' });
        }
      });

  // Company Reviews
  router.get('/api/reviews/:id', async (req, res) => {
    const selectCompanyReviews = `
      SELECT
        r.position,
        r.faculty,
        r.term,
        r.year,
        r.season,
        r.city,
        r.app_source,
        r.recruitment_review,
        r.interview_review,
        r.internship_review,
        r.internship_state,
        r.interview_state,
        r.monthly_salary,
        r.reject_internship_review,
        r.rating,
        c.name
      FROM review as r INNER JOIN company as c ON r.company_id = c.id
      WHERE company_id = ?
    `;

    try {
      if (!req.params.id) {
        throw { badRequest: true };
      }
      const companyReviews = await query(selectCompanyReviews, [req.params.id]);
      res.status(200).json(companyReviews);
    } catch(e) {
      res.status(500).json({ reason: 'Something went wrong' });
    }
  });

  return router;
}

module.exports = privateApiExpressRouter;
