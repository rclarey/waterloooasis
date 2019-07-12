# GET /comments/:jobID?ordering=W&n=X&offset=Y&parent=Z
Get a nested list of top-level comments.
`ordering` and `n` are required, `offset` and `parent` are optional.

`jobID` is the id of the job posting
`ordering` is one of `relevant`, `top`, or `new`
`n` is an integer number of comments
`offset` is an integer offset from the top of the list
`parent` is a comment id used when requesting more replies

Returns:
```typescript
[
  {
    id: number,
    author: {
      name: string,
      trusted: boolean,
    },
    timeString: string,
    text: string,
    likes: number,
    liked: boolean,
    replies: {
      overflowString: string,
      comments: [ ... ],
    },
  },
  ...
]
```


# GET /jobs/:jobID
Get the info for a job posting.

`jobID` is the id of the job posting

Returns:
```typescript
{
  id: number,
  company: {
    shortName: string,
    name: string,
    logoSrc: string,
  },
  title: string,
  status: {
    statusString: string,
    updateString: string,
    timeString: string,
  },
  statusStage: 1 | 2 | 3,
  payString: string,
  description: string,
}
```


# GET /trending
Get the list of trending job posts.

Returns:
```typescript
[
  {
    id: number,
    company: {
      shortName: string,
      name: string,
    },
    title: string,
    status: {
      statusString: string,
      updateString: string,
      timeString: string,
    },
    statusStage: 1 | 2 | 3,
    payString: string,
  },
  ...
]
```


# GET /myjobs
Get the list of jobs a user is following.

Returns:
```typescript
[
  {
    id: number,
    company: {
      shortName: string,
      name: string,
    },
    title: string,
    status: {
      statusString: string,
      updateString: string,
      timeString: string,
    },
    statusStage: 1 | 2 | 3,
    payString: string,
  },
  ...
]
```


# GET /company/:shortName
Get the info about a company.

`shortName` is the short version of the company's name (ex: 'facebook', or 'cockroachlabs')

Returns:
```typescript
{
  id: number,
  shortName: string,
  logoSrc: string,
  name: string,
  description: string,
}
```


# GET /company/:shortName/jobs
Get the list of job postings for a company.

`shortName` is the short version of the company's name (ex: 'facebook', or 'cockroachlabs')

Returns:
```typescript
[
  {
    id: number,
    title: string,
    status: {
      statusString: string,
      updateString: string,
      timeString: string,
    },
    statusStage: 1 | 2 | 3,
    payString: string,
  },
  ...
]
```
