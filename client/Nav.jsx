import React, { useCallback, useState } from 'react';
import { Link } from '@reach/router';

import 'Nav.css';

function Nav() {
  const [query, setQuery] = useState('');
  const updateQuery = useCallback(e => setQuery(e.target.value), []);
  const submitQuery = useCallback(
    e => {
      e.preventDefault();
      alert(`you searched: ${query}`);
    },
    [query],
  );

  return (
    <nav className="nav__container">
      <Link className="nav__logo" to="/">
        <img height="32px" src="/img/logo.png" alt="Waterloo Oasis logo" />
      </Link>
      <form className="nav__searchform" onSubmit={submitQuery}>
        <input
          className="nav__searchinput"
          type="text"
          placeholder="Search"
          value={query}
          onChange={updateQuery}
        />
      </form>
      <Link className="nav__signout" to="/signin">
        Sign out
      </Link>
    </nav>
  );
}

export default Nav;
