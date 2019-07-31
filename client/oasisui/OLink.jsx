import React, { memo } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import * as classNames from 'classnames';

import 'oasisui/OLink.css';

function OLink({ className, text, to, light, large, isAnchorLink, activeLinking }) {
  const classes = `${classNames('olink__container', {
    olink__light: light,
    olink__dark: !light,
    olink__large: large,
    olink__small: !large,
  })} ${className || ''}`;

  console.log(classes);

  if (isAnchorLink) {
    <a className={classes} href={to}>
      {text}
    </a>
  }

  return (
    <Link className={classes} to={to} getProps={true ? ({ isCurrent }) => ({
      className: `${classes} ${isCurrent ? '' : 'olink__inactive'}`
    }) : undefined}>
      {text}
    </Link>
  );
}

OLink.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  light: PropTypes.bool,
  large: PropTypes.bool,
  isAnchorLink: PropTypes.bool,
  activeLinking: PropTypes.bool,
};

export default memo(OLink);
