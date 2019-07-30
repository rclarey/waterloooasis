import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, navigate } from '@reach/router';

import { Field, Form, FormRow } from 'public/Form.jsx';
import { post } from 'utils.js';

import 'public/auth.css';

const minPasswordLength = 8;
async function validatePassword(password) {
  return password.length >= minPasswordLength;
}

function SignUp({ setEmail }) {
  const [passwordRef, setPasswordRef] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const validateConfirm = useCallback(
    async confirm => {
      if (!passwordRef) {
        return false;
      }
      const password = passwordRef.value;
      return (await validatePassword(password)) && password === confirm;
    },
    [passwordRef],
  );

  const handleError = useCallback(error => {
    if (error.reason) {
      setErrorMessage(error.reason);
    } else {
      setErrorMessage('Something went wrong. Please try again later');
    }
  }, []);

  // pretty sure WatIAM ids are strictly alphanumeric
  const watiamIdPattern = /[a-zA-Z0-9]+/;
  const validateWatiamId = useCallback(
    async watiamId => {
      try {
        const result = watiamIdPattern.exec(watiamId);
        if (result === null || result[0].length !== watiamId.length) {
          return false;
        }

        const { unused } = await post('/exists', {
          email: `${watiamId}@edu.uwaterloo.ca`,
        });

        return unused;
      } catch (error) {
        handleError(error);
        return null;
      }
    },
    [handleError],
  );

  const onSubmit = useCallback(
    async info => {
      try {
        setErrorMessage(null);
        const email = `${info.watiam.value}@edu.uwaterloo.ca`;
        await post('/signup', {
          email,
          password: info.password.value,
        });
        setEmail(email);
        navigate('/verify');
      } catch (error) {
        handleError(error);
      }
    },
    [setEmail, setErrorMessage],
  );

  return (
    <section className="auth__container">
      <img
        className="auth__logo"
        width="150px"
        alt="Waterloo Oasis logo"
        src="svg/oasis.svg"
      />
      <div className="auth__messagearea">
        {errorMessage ? (
          <div className="auth__error">{errorMessage}</div>
        ) : null}
      </div>
      <Form
        cta="Sign up"
        names={['watiam', 'password', 'confirm']}
        onSubmit={onSubmit}
      >
        <FormRow className="auth__emailrow">
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
        Sign in
      </Link>
    </section>
  );
}
SignUp.propTypes = {
  setEmail: PropTypes.func.isRequired,
};

export default memo(SignUp);
