const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');

const expressUtils = require('shared/util/expressUtils');
const setupAuth = require('web_service/auth/auth.js');
const { pool } = require('shared/util/db.js');

function serveApp(_, res) {
  res.sendFile('web_service/static/app.html', { root: '.' });
}

function servePublicPages(_, res) {
  res.sendFile('web_service/static/public.html', { root: '.' });
}

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

function timeString(datetime) {
  const diff = Date.now() - new Date(datetime);
  const years = Math.floor(diff / 31536000000);
  const months = Math.floor(diff / 2592000000);
  const weeks = Math.floor(diff / 604800000);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor(diff / 60000);

  if (years > 0) {
    return `${years}y`;
  }
  if (months > 0) {
    return `${months}mo`;
  }
  if (weeks > 0) {
    return `${weeks}w`;
  }
  if (days > 0) {
    return `${days}d`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }

  return `${minutes || 1}m`;
}

const publicWebExpressRouter = (() => {
  const router = expressUtils.createRouter();

  router.use(express.static('web_service/static'));
  router.use(bodyParser.urlencoded());
  router.use(bodyParser.json());
  router.use(cookieParser(process.env.COOKIE_SECRET));

  const { authenticate, authenticationFork } = setupAuth(router);

  router.get('/', authenticationFork(serveApp, servePublicPages));
  router.get('/trending', authenticate, serveApp);
  router.get('/myjobs', authenticate, serveApp);
  router.get('/mycomments', authenticate, serveApp);
  router.get('/signin', servePublicPages);
  router.get('/signup', servePublicPages);
  router.get('/verify', servePublicPages);
  router.get('/jobs/*', authenticate, serveApp);
  router.get('/jobs/*/*', authenticate, serveApp);

  /**
  FOR NOW PUT THIS HERE TO TEST EXTERNALLY
  */
  router.get('/api/users', (_, res) => {
    const select_query = 'SELECT * FROM waterloo_oasis_dev.user';
    pool.query(select_query, function(err, rows) {
      if (err) throw err;
      res.send(rows);
    });
  });

  router.get('/api/trending', (_, res) => {
    const q = jobQuery();
    pool.query(q, (err, rows) => {
      if (err) {
        return;
      }
      res.json(rows.map(jsonifyJob));
    });
  });

  router.get('/api/job/:shortCode', (req, res) => {
    const jobq = jobQuery('where job.short_code = ?');
    pool.query(jobq, [req.params.shortCode], (jobErr, [job]) => {
      if (jobErr) {
        return;
      }

      const commentq =
        'select comment.*, user.username from comment inner join user on comment.author_id = user.id where job_id = ? order by id;';
      pool.query(commentq, [job.id], (commentErr, rows) => {
        if (commentErr) {
          return;
        }

        const map = {};
        const replies = [];
        const comments = [];
        rows.forEach(row => {
          const comment = {
            ...row,
            author: {
              name: row.username,
            },
            timeString: timeString(row.date_time),
            replies: [],
          };
          map[row.id] = comment;
          if (comment.parent_id !== null) {
            replies.push(comment);
          } else {
            comments.push(comment);
          }
        });
        replies.forEach(reply => {
          map[reply.parent_id].replies.push(reply);
        });

        res.json({
          ...jsonifyJob(job),
          commentCount: rows.length,
          comments,
        });
      });
    });
  });

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
})();

module.exports = publicWebExpressRouter;
