/** rclarey:
 * This is the data model (in an API sense, I fully expect there to be more / different fields in the DB)
 * I built my initial frontend stuff with.
 * Feel free to extend it / bash it / suggest something different.
 */

interface Job {
  id: number; // unique identifier
  shortCode: string; // for use in URL (e.g. /jobs/facebook/87asdilhuasd)
  company: Company; // company association
  title: string; // job title
  status: string; // status string
  statusStage: 1 | 2 | 3; // determines colour of status string
  pay: number; // integer dollar amount of monthly pay
  squares: number; // TODO: this isn't a real thing. IDK what the squares with the number next to the comment count was so I put this here to represent that. replace with actual thing
  description: string; // description of job
  comments: Comment[]; // comments on this job
}

interface Company {
  id: number; // unique identifier
  shortName: string; // for use in URL (e.g. /jobs/facebook/987as7d98)
  name: string; // name of company
  description: string; // description of company
  jobs: Job[]; // jobs for this company
}

interface Comment {
  id: number; // unique identifier
  author: User; // user who made the comment
  timeString: string; // time string to display (e.g. 37m, 5h, 1w, etc)
  text: string; // contents of comments
  likes: number; // number of likes
  liked: boolean; // has the current user liked this comment
  replies: Comment[];
}

interface User {
  name: string; // my thinking was give each user a unique random name (a la gfycat URLs if y'all familiar) so people can recognize when they're conversing with the same person / different people, and shit stays pseudonymous
  trust: number; // this could also be a binary trusted/not trusted, but it may be cool to have a trust score to distinguish a little trust from a lot of trust
  jobs: Job[]; // jobs the user is following
}
