import React, { memo } from 'react';
import PropTypes from 'prop-types';
import * as classNames from 'classnames';

import 'oasisui/OLink.css';

function OFakeLink({
  className,
  text,
  onClick,
  light,
  large,
  medium,
  isInactive,
}) {
  const classes = `${classNames('olink__container', {
    olink__light: light,
    olink__dark: !light,
    olink__large: large,
    olink__medium: medium,
    olink__small: !large && !medium,
    olink__inactive: !!isInactive,
  })} ${className || ''}`;

  return (
    <span className={classes} onClick={onClick}>
      {text}
    </span>
  );
}

OFakeLink.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  light: PropTypes.bool,
  large: PropTypes.bool,
  medium: PropTypes.bool,
  isInactive: PropTypes.bool,
};

export default memo(OFakeLink);
