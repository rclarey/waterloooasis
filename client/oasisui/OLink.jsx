import React, { memo } from 'react';
import * as classNames from 'classnames';

import 'oasisui/OLink.css';

function OLink({text, light, large, link}) {
  const classes = classNames('olink__container', {
    'olink__light': light,
    'olink__dark': !light,
    'olink__large': large,
    'olink__small': !large,
  });
  return (
    <a href={link} className={classes}>
      {text}
    </a>
  );
}

export default memo(OLink);
