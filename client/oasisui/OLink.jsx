import React, { memo } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import * as classNames from 'classnames';

import 'oasisui/OLink.css';

function OLink({ text, light, large, link, isRouterLink }) {
  const classes = classNames('olink__container', {
    olink__light: light,
    olink__dark: !light,
    olink__large: large,
    olink__small: !large,
  });

  if (isRouterLink) {
    <Link className={classes} to={link}>
      {text}
    </Link>
  }

  return (
    <a className={classes} href={link}>
      {text}
    </a>
  );
}

OLink.propTypes = {
  text: PropTypes.string.isRequired,
  light: PropTypes.bool,
  large: PropTypes.bool,
  link: PropTypes.string.isRequired,
  isRouterLink: PropTypes.bool,
};

export default memo(OLink);
