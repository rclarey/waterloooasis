import React, { memo } from 'react';
import PropTypes from 'prop-types';
import * as classNames from 'classnames';

import 'oasisui/OButton.css';

function OButton({ text, alt, light, large, disabled, onClick }) {
  const classes = classNames('obutton__container', {
    obutton__alt: alt,
    obutton__cta: !alt,
    obutton__light: light,
    obutton__dark: !light,
    obutton__large: large,
    obutton__small: !large,
  });
  return (
    <button disabled={disabled} className={classes} onClick={onClick}>
      {text}
    </button>
  );
}

OButton.propTypes = {
  text: PropTypes.string.isRequired,
  alt: PropTypes.bool,
  light: PropTypes.bool,
  large: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(OButton);
