import React, { memo } from 'react';
import { Link } from '@reach/router';

import 'shared/FourOhFour.css';

function FourOhFour() {
  return (
    <>
      <h2>Sorry friend, you&apos;re lost.</h2>
      <Link to="/trending">Take me home!</Link>
    </>
  );
}

export default memo(FourOhFour);
