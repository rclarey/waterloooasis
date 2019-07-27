import React, { Suspense, memo } from 'react';
import { Link, Router } from '@reach/router';

import Spinner from 'shared/Spinner.jsx';

import 'LandingPage.css';

function OButton(text, alt, light) {
  return (
    <div>
    </div>
  );
}

function TabLink(props) {
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => ({
        className: `home__tabheader${
          isCurrent ? ' home__tabheader--active' : ''
        }`,
      })}
    />
  );
}

export default memo(OButton);
