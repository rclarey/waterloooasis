import React, { useCallback, useState } from 'react';
import { Link } from '@reach/router';
import * as axios from 'axios';
import * as u from 'shared/util/u';

import 'Nav.css';

document.addEventListener('keydown', e => {
  const searchBar = document.getElementById('searchBar');

  if (e.code === 'KeyF' && !e.metaKey && document.activeElement !== searchBar) {
    e.preventDefault();
    searchBar.focus();
  }
});

async function search(query) {
  const results = (await axios.get(`/api/search?queryString=${query}`)).data;
  // TODO: remove log statement.
  u.log(results.map(result => result._source.company.name));
}

function Nav() {
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState('');
  const updateQuery = useCallback(e => setQuery(e.target.value), []);
  const onFocusSearch = () => {
    setSearchFocused(true);
    setTimeout(() => {
      setSearchFocused(false);
    }, 1000);
  };
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
            id="searchBar"
            className={`nav__search-input ${
              searchFocused ? 'nav__search-input-shadow' : ''
            }`}
            type="text"
            value={query}
            onChange={updateQuery}
            onFocus={onFocusSearch}
          />
          <input
            className="nav__search-icon"
            type="image"
            value={query}
            src="svg/search.svg"
          />
        </form>
        <Link className="nav__profile" to="/profile">
          <img src="svg/profile.svg" />
        </Link>
      </nav>
      <div className="nav__overlay" />
    </>
  );
}

export default Nav;
