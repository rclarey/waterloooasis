<img src="https://github.com/rclarey/waterloooasis/blob/master/web_service/static/svg/oasis-large.svg" />

[![Build Status](https://travis-ci.com/rclarey/waterloooasis.svg?token=Br6Dga4A8HWs9sYxhWqs&branch=master)](https://travis-ci.com/rclarey/waterloooasis)

#### Table of Contents  
- [Getting set up](#getting-set-up)
    - [DB](#db)
    - [Search](#search)
- [Workflow](#workflow)


# Getting set up

- Install node, if necessary:
- Run `npm install`
- Run `sudo npm i -g grunt`
- Run `grunt symlink`
- In two terminal tabs, run:
    - `grunt`, and
    - `JWT_SECRET=<your jwt secret> COOKIE_SECRET=<your cookie secret> MAILER_USER=<gmail address> MAILER_PW=<gmail pw> grunt web`

## DB
- Create a database called `waterloo_oasis_dev`
- Run `mysql -u root -p waterloo_oasis_dev < dump.sql` to import the db dump

## Search
- Install docker, if necessary
- Run `grunt search` to bring up the elasticsearch cluster (run `grunt search-down` when you're done to take down the elasticsearch cluster)
- Run `grunt indexSearch` to populate elasticsearch with job data


# Workflow
- Create a new branch for your work, no specific naming conventions.
- Before creating a PR, run `grunt precommit` to display eslint errors and automatically fix prettier errors. Fix any eslint errors and commit.
- Try to create a Github issue for all work (and reference it in your PRs)
