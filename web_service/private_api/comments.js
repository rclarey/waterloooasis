const { query, timeString } = require('shared/util/db.js');

function formatComment(comment) {
  return {
    id: comment.id,
    companyId: comment.company_id,
    jobId: comment.job_id,
    parentId: comment.parent_id,
    author: {
      username: comment.username,
      trusted: false,
    },
    timeString: timeString(comment.date_time),
    likes: comment.likes,
    liked: !!comment.liked,
    text: comment.text,
    replies: [],
  };
}

const maxDepth = 6;
async function getCommentsForJobAndCompany(req, res) {
  const rootQuery = `
    SELECT comment.*, user.username, (comment_likes.id IS NOT NULL) as liked FROM comment
    LEFT JOIN user ON comment.author_id = user.id
    LEFT JOIN comment_likes ON comment.id = comment_likes.comment_id AND comment_likes.user_id = ?
    WHERE comment.job_id = ? AND comment.company_id = ? AND comment.parent_id IS NULL
    ORDER BY comment.date_time DESC`;
  const replyQuery = `
    SELECT comment.*, user.username, (comment_likes.id IS NOT NULL) as liked FROM comment
    LEFT JOIN user ON comment.author_id = user.id
    LEFT JOIN comment_likes ON comment.id = comment_likes.comment_id AND comment_likes.user_id = ?
    WHERE comment.job_id = ? AND comment.company_id = ? AND comment.parent_id = ?
    ORDER BY comment.date_time DESC`;

  const { companyId, jobId } = req.body;
  const userId = req.user.id;
  if (!companyId || !jobId) {
    res.status(400).json({ reason: 'Bad request' });
  } else {
    try {
      const commentMap = {};
      const toplevel = await query(rootQuery, [userId, jobId, companyId]);
      let output = [];
      for (const comment of toplevel) {
        const formatted = formatComment(comment);
        commentMap[comment.id] = formatted;
        output.push(formatted);
      }

      let curLevel = toplevel;
      for (let i = 0; i < maxDepth; i += 1) {
        const nextLevel = [];
        for (const comment of curLevel) {
          const replies = await query(replyQuery, [
            userId,
            jobId,
            companyId,
            comment.id,
          ]);
          const parent = commentMap[comment.id];
          for (const reply of replies) {
            const formatted = formatComment(reply);
            commentMap[reply.id] = formatted;
            parent.replies.push(formatted);
          }

          nextLevel.push(...replies);
        }

        curLevel = nextLevel;
      }

      res.status(200).json({ comments: output });
    } catch (e) {
      res.status(500).json({ reason: 'Something went wrong' });
    }
  }
}

async function createComment(req, res) {
  const queryStr = `
      INSERT INTO comment
      (company_id, job_id, parent_id, author_id, date_time, edited, text)
      VALUES(?, ?, ?, ?, NOW(), ?, ?)`;

  try {
    const { text, companyId, jobId, parentId } = req.body;
    if (!text || !companyId || !jobId) {
      res.status(400).json({ reason: 'Bad request' });
    } else {
      // auth middleware puts a user object on req
      const authorId = req.user.id;
      const edited = 0; /* This can be done in the future */

      await query(queryStr, [
        companyId,
        jobId,
        parentId,
        authorId,
        edited,
        text,
      ]);
      res.status(200).json({ ok: true });
    }
  } catch (e) {
    res.status(500).send({ reason: 'Something went wrong' });
  }
}

async function toggleLiked(req, res) {
  const existingLike =
    'SELECT count(*) FROM comment_likes WHERE user_id = ? AND comment_id = ?';
  const insertLike =
    'INSERT INTO comment_likes (user_id, comment_id) VALUES(?, ?)';
  const deleteLike =
    'DELETE FROM comment_likes WHERE user_id = ? AND comment_id = ?';
  const incLikes = 'UPDATE comment SET likes=(likes+1) WHERE id = ?';
  const decLikes = 'UPDATE comment SET likes=(likes-1) WHERE id = ?';

  try {
    const { value: doLike, commentId } = req.body;
    const userId = req.user.id;

    const liked =
      (await query(existingLike, [userId, commentId]))[0]['count(*)'] > 0;

    if (doLike && !liked) {
      await query(insertLike, [userId, commentId]);
      await query(incLikes, [commentId]);
    } else if (!doLike && liked) {
      await query(deleteLike, [userId, commentId]);
      await query(decLikes, [commentId]);
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).send({ reason: 'Something went wrong' });
  }
}

function setupComments(router) {
  router.post('/api/comment', createComment);
  router.get('/api/comments', getCommentsForJobAndCompany);
  router.post('/api/like', toggleLiked);
}

module.exports = setupComments;
