import React, { memo } from 'react';
import * as classNames from 'classnames';

import 'oasisui/OLink.css';

function OLink({text, light, large}) {
  const classes = classNames('olink__container', {
    'olink__light': light,
    'olink__dark': !light,
    'olink__large': large,
    'olink__small': !large,
  });
  return (
    <div className={classes}>
      {text}
    </div>
  );
}

export default memo(OLink);
