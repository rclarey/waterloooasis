import React, { memo, useCallback, useState } from 'react';
import { Link } from '@reach/router';

import { Field, Form, FormRow } from 'public/Form.jsx';
import OButton from 'oasisui/OButton.jsx';
import { post } from 'utils.js';

import 'public/auth.css';

// pretty sure WatIAM ids are strictly alphanumeric
const watiamIdPattern = /[a-zA-Z0-9]+/;
async function validateWatiamId(watiamId) {
  const result = watiamIdPattern.exec(watiamId);
  if (result === null || result[0].length !== watiamId.length) {
    return false;
  }

  const { unused } = await post('/exists', {
    email: `${watiamId}@edu.uwaterloo.ca`,
  });

  return unused;
}

const minPasswordLength = 8;
async function validatePassword(password) {
  return password.length >= minPasswordLength;
}

async function validateConfirmPassword(passwordRef, confirm) {
  return !!passwordRef && passwordRef.value === confirm;
}

async function onSubmit(info) {
  const { redirect } = await post('/signup', {
    email: `${info.watiam.value}@edu.uwaterloo.ca`,
    password: info.password.value,
  });

  window.location.pathname = redirect;
}

function SignUp() {
  const [passwordRef, setPasswordRef] = useState(null);
  const validateConfirm = useCallback(
    validateConfirmPassword.bind(null, passwordRef),
    [passwordRef],
  );
  return (
    <section className="auth__container">
      <img className="auth__logo" src="svg/oasis.svg" />
      <Form
        btnText="Sign up"
        names={['watiam', 'password', 'confirm']}
        onSubmit={onSubmit}
      >
        <FormRow>
          <Field
            placeholder="WatIAM ID"
            name="watiam"
            validate={validateWatiamId}
          />
          <span className="auth__emailsuffix">@edu.uwaterloo.ca</span>
        </FormRow>
        <FormRow>
          <Field
            placeholder="Password"
            name="password"
            type="password"
            setRef={r => setPasswordRef(r)}
            validate={validatePassword}
          />
        </FormRow>
        <FormRow>
          <Field
            placeholder="Confirm password"
            name="confirm"
            type="password"
            validate={validateConfirm}
          />
        </FormRow>
      </Form>
      <div className="auth__spacer" />
      <Link className="auth__switchbutton" to="/signin">
        <OButton text="Log in" alt={true} />
      </Link>
    </section>
  );
}

export default memo(SignUp);
