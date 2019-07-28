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
      <a className="nav__signout" href="#" onClick={signOut}>
        Sign out
      </a>
    </nav>
  );
}

export default Nav;
