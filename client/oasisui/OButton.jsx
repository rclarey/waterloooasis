import React, { memo } from 'react';
import * as classNames from 'classnames';

import 'oasisui/OButton.css';

function OButton({text, alt, light, large}) {
  const classes = classNames('obutton__container', {
    'obutton__alt': alt,
    'obutton__cta': !alt,
    'obutton__light': light,
    'obutton__dark': !light,
    'obutton__large': large,
    'obutton__small': !large,
  });
  return (
    <div className={classes}>
      {text}
    </div>
  );
}

export default memo(OButton);
