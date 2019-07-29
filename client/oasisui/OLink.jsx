import React, { memo } from 'react';
import PropTypes from 'prop-types';
import * as classNames from 'classnames';

import 'oasisui/OLink.css';

function OLink({ text, light, large, link }) {
  const classes = classNames('olink__container', {
    olink__light: light,
    olink__dark: !light,
    olink__large: large,
    olink__small: !large,
  });
  return (
    <a href={link} className={classes}>
      {text}
    </a>
  );
}

OLink.propTypes = {
  text: PropTypes.string.isRequired,
  light: PropTypes.bool,
  large: PropTypes.bool,
  link: PropTypes.string.isRequired,
};

export default memo(OLink);
