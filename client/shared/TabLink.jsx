import React, { memo } from 'react';

import OLink from 'oasisui/OLink.jsx';

function TabLink(props) {
  return (
    <div className="home__tabheader">
      <OLink
        large={true}
        activeLinking={true}
        {...props}
        activeClassName="home__tabheader--active"
      />
    </div>
  );
}

export default memo(TabLink);
