import React, { useCallback, useState } from 'react';
import { Link } from '@reach/router';

import { post } from 'utils.js';
import useFetch from 'fetch-suspense';

import 'Nav.css';

async function signOut() {
  try {
    await post('/signout');
    window.location.pathname = '/';
  } catch (e) {
    // TODO: do something about this
  }
}

async function search(query) {
  const results = await useFetch(`/api/search?queryString=${query}`);
  console.log(results);
}

function Nav() {
  const [query, setQuery] = useState('');
  const updateQuery = useCallback(e => setQuery(e.target.value), []);
  const submitQuery = useCallback(
    e => {
      e.preventDefault();
      search(query);
    },
    [query],
  );

  return (
    <>
      <nav className="nav__container">
        <Link className="nav__logo" to="/">
          <img src="svg/oasis.svg" />
        </Link>
        <form className="nav__search-form" onSubmit={submitQuery}>
          <input
            className="nav__search-input"
            type="text"
            value={query}
            onChange={updateQuery}
          />
          <input
            className="nav__search-icon"
            type="image"
            value={query}
            src="svg/search.svg"
          />
        </form>
        <a className="nav__profile" href="#" onClick={signOut}>
          <img src="svg/profile.svg" />
        </a>
      </nav>
      <div className="nav__overlay" />
    </>
  );
}

export default Nav;
