import React, { Suspense, memo } from 'react';
import { Link, Router } from '@reach/router';
import * as classNames from 'classnames';

import Spinner from 'shared/Spinner.jsx';

import 'oasisui/OButton.css';

function OButton({text, alt, light, large}) {
  const classes = classNames('obutton__container', {
    'obutton__alt': alt,
    'obutton__light': light,
    'obutton__large': large,
  });
  return (
    <div className={classes}>
      {text}
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
