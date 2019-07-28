import React, { memo } from 'react';
import { Link } from '@reach/router';

import { Field, Form, FormRow } from 'public/Form.jsx';
import { post } from 'utils.js';

import 'public/auth.css';

async function onSubmit(info) {
  const { redirect } = await post('/signin', {
    email: `${info.watiam.value}@edu.uwaterloo.ca`,
    password: info.password.value,
  });

  window.location.pathname = redirect;
}

function SignIn() {
  return (
    <section className="auth__container">
      <img
        className="auth__logo"
        width="150px"
        alt="Waterloo Oasis logo"
        src="img/logo.png"
      />
      <Form
        cta="Sign in"
        names={['watiam', 'password']}
        onSubmit={onSubmit}
        noDisable={true}
      >
        <FormRow>
          <Field placeholder="WatIAM ID" name="watiam" />
          <span className="auth__emailsuffix">@edu.uwaterloo.ca</span>
        </FormRow>
        <FormRow>
          <Field placeholder="Password" name="password" type="password" />
        </FormRow>
      </Form>
      <div className="auth__spacer" />
      <Link className="auth__switchbutton" to="/signup">
        Sign up
      </Link>
    </section>
  );
}

export default memo(SignIn);
