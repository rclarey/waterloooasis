# Waterloo Oasis
[![Build Status](https://travis-ci.com/rclarey/waterloooasis.svg?branch=master)](https://travis-ci.com/rclarey/waterloooasis)
# Getting set up

- Install node, if necessary:
- Run `npm install`
- Run `sudo npm i -g grunt`
- Run `grunt symlink`
- In two terminal tabs, run:
    - `grunt`, and
    - `JWT_SECRET=<your jwt secret> COOKIE_SECRET=<your cookie secret> MAILER_USER=<gmail address> MAILER_PW=<gmail pw> grunt web`

# DB set up
`mysql -u root -p waterloo_oasis_dev < dump.sql`
