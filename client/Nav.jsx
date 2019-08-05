import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '@reach/router';
import * as axios from 'axios';
import * as u from 'shared/util/u';

import { post } from 'utils.js';

import 'Nav.css';

function focusSearch(el, e) {
  const activeTag = document.activeElement.tagName;

  if (
    e.code === 'KeyF' &&
    !e.metaKey &&
    activeTag !== 'INPUT' &&
    activeTag !== 'TEXTAREA'
  ) {
    e.preventDefault();
    el.focus();
  }
}

async function signOut() {
  try {
    await post('/signout');
    window.location.pathname = '/';
  } catch (e) {
    // TODO: do something about this
  }
}

async function search(query) {

}

function Nav({ searchUpdate }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState('');

  const updateQuery = useCallback(
    e => {
      const query = e.target.value;
      setQuery(query);
      searchUpdate(query);
    },
    []);
  const onFocusSearch = useCallback(() => {
    setSearchFocused(true);
    setTimeout(() => {
      setSearchFocused(false);
    }, 1000);
  }, []);
  const submitQuery = useCallback(
    e => {
      e.preventDefault();
      search(query);
    },
    [query],
  );

  useEffect(() => {
    const listener = focusSearch.bind(null, inputRef.current);
    if (inputRef.current !== null) {
      document.addEventListener('keydown', listener);
    }

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [inputRef.current]);

  return (
    <>
      <nav className="nav__container">
        <Link className="nav__logo" to="/">
          <img src="/svg/oasis.svg" />
        </Link>
        <form className="nav__search-form" onSubmit={submitQuery}>
          <input
            ref={inputRef}
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
            src="/svg/search.svg"
          />
        </form>
        <a className="nav__profile" href="#" onClick={signOut}>
          <img src="/svg/profile.svg" />
        </a>
      </nav>
      <div className="nav__overlay" />
    </>
  );
}

export default Nav;
