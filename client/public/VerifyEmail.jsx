import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, navigate } from '@reach/router';

import Spinner from 'shared/Spinner.jsx';
import { post } from 'utils.js';

import 'public/VerifyEmail.css';

async function retryEmail(email) {
  try {
    const result = await post('/retryemail', { email });
    return result;
  } catch (failureResult) {
    return failureResult;
  }
}

function ResendMessage({ status, resend }) {
  const resendLink = (
    <a href="#" onClick={resend}>
      Resend verification email
    </a>
  );

  if (!status) {
    return resendLink;
  }

  if (status.loading) {
    return <Spinner centre={true} size={20} />;
  }

  if (status.ok) {
    return <p>Verification email sent!</p>;
  }

  if (status.softRetry) {
    return (
      <>
        <p>Failed to resend verification email.</p>
        <a href="#" onClick={resend}>
          Try again
        </a>
      </>
    );
  }

  if (status.hardRetry) {
    return (
      <>
        <p>
          Something went wrong on our end. You need fill out the sign up form
          again.
        </p>
        <Link to="/signup">Return to the sign up form</Link>
      </>
    );
  }

  return resendLink;
}
ResendMessage.propTypes = {
  status: PropTypes.shape({
    loading: PropTypes.boolean,
    ok: PropTypes.boolean,
    softRetry: PropTypes.boolean,
    hardRetry: PropTypes.boolean,
  }).isRequired,
  resend: PropTypes.func.isRequired,
};
const MemoedResendMessage = memo(ResendMessage);

function CheckYourEmail({ email }) {
  const [resendStatus, setResendStatus] = useState(null);
  const resend = useCallback(async () => {
    setResendStatus({ loading: true });
    setResendStatus(await retryEmail(email));
  }, [email]);

  return (
    <section>
      <h1>We&apos;ve sent a verification link to {email}</h1>
      <p>
        If the email does not appear try checking the junk or spam folder of
        your inbox.
      </p>
      <MemoedResendMessage status={resendStatus} resend={resend} />
    </section>
  );
}
CheckYourEmail.propTypes = {
  email: PropTypes.string.isRequired,
};
const MemoedCheckYourEmail = memo(CheckYourEmail);

function Verifying({ code }) {
  const [verifFailed, setVerifFailed] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const { redirect } = await post('/verify', { code });
        window.location.search = '';
        window.location.pathname = redirect;
      } catch (failure) {
        if (failure.reason) {
          setVerifFailed(failure);
        } else {
          setVerifFailed({
            reason: 'Sorry, something went wrong on our side.',
          });
        }
      }
    })();
  }, [code]);

  if (verifFailed) {
    return (
      <>
        <h1>{verifFailed.reason}</h1>
        <p>
          <Link to="/signup">Click here</Link> to return to the sign up form
          where you can restart the verification process.
        </p>
      </>
    );
  }

  return (
    <>
      <h1>Checking verification code...</h1>
      <Spinner size={50} centre={true} />
    </>
  );
}
Verifying.propTypes = {
  code: PropTypes.string.isRequired,
};
const MemoedVerifying = memo(Verifying);

const paramPattern = /\?v=([0-9a-zA-Z_-]+)/;
function VerifyEmail({ email }) {
  const code = useMemo(() => {
    const result = paramPattern.exec(window.location.search);
    return result === null ? null : result[1];
  }, [email]);

  if (!email && !code) {
    navigate('/signup');
    window.location.reload();
    return null;
  }

  return (
    <main className="verify__container">
      {code === null ? (
        <MemoedCheckYourEmail email={email} />
      ) : (
        <MemoedVerifying code={code} />
      )}
    </main>
  );
}
VerifyEmail.propTypes = {
  email: PropTypes.string,
};
export default memo(VerifyEmail);
