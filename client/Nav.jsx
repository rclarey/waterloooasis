import React, { useCallback, useState } from 'react';
import { Link } from '@reach/router';

import { post } from 'utils.js';

import 'Nav.css';

async function signOut() {
  try {
    await post('/signout');
    window.location.pathname = '/';
  } catch (e) {
    // TODO: do something about this
  }
}

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
        <img src="svg/oasis.svg" />
      </Link>
      <form className="nav__search-form" onSubmit={submitQuery}>
        <img src="svg/search.svg" className="nav__search-icon" />
        <input
          className="nav__search-input"
          type="text"
          placeholder="Search"
          value={query}
          onChange={updateQuery}
        />
      </form>
      <a className="nav__profile" href="#" onClick={signOut}>
        <img src="svg/profile.svg" />
      </a>
    </nav>
  );
}

export default Nav;
