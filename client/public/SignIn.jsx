import React, { memo, useCallback, useState } from 'react';
import { Link } from '@reach/router';

import { Field, Form, FormRow } from 'public/Form.jsx';
import OButton from 'oasisui/OButton.jsx';
import { post } from 'utils.js';

import 'public/auth.css';

function SignIn() {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleError = useCallback(error => {
    if (error.reason) {
      setErrorMessage(error.reason);
    } else {
      setErrorMessage('Something went wrong. Please try again later');
    }
  }, []);

  const onSubmit = useCallback(
    async info => {
      try {
        setErrorMessage(null);
        const { redirect } = await post('/signin', {
          email: `${info.watiam.value}@edu.uwaterloo.ca`,
          password: info.password.value,
        });

        window.location.pathname = redirect;
      } catch (error) {
        handleError(error);
      }
    },
    [setErrorMessage],
  );

  return (
    <section className="auth__container">
      <img className="auth__logo" src="svg/oasis.svg" />
      <div className="auth__messagearea">
        {errorMessage ? (
          <div className="auth__error">{errorMessage}</div>
        ) : null}
      </div>
      <Form
        btnText="Log in"
        isAlt={true}
        names={['watiam', 'password']}
        onSubmit={onSubmit}
        noDisable={true}
      >
        <FormRow className="auth__emailrow">
          <Field placeholder="WatIAM ID" name="watiam" />
          <span className="auth__emailsuffix">@edu.uwaterloo.ca</span>
        </FormRow>
        <FormRow>
          <Field placeholder="Password" name="password" type="password" />
        </FormRow>
      </Form>
      <div className="auth__spacer" />
      <Link className="auth__switchbutton" to="/signup">
        <OButton text="Sign up" />
      </Link>
    </section>
  );
}

export default memo(SignIn);
