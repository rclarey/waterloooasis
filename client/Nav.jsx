import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

import { post } from 'utils.js';

import OButton from 'oasisui/OButton.jsx';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

function Nav({ searchUpdate }) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState('');
  const [anchorEl, setAnchorEl] = useState('');

  const updateQuery = useCallback(e => {
    const query = e.target.value;
    setQuery(query);
    searchUpdate(query);
  }, []);
  const onFocusSearch = useCallback(() => {
    setSearchFocused(true);
    setTimeout(() => {
      setSearchFocused(false);
    }, 1000);
  }, []);
  const submitQuery = useCallback(
    e => {
      e.preventDefault();
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

    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

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

        <a className="nav__profile" href="#" onClick={handleClick}>
          <img src="/svg/profile.svg" />
        </a>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={signOut}>Logout</MenuItem>
        </Menu>

      </nav>
      <div className="nav__overlay" />
    </>
  );
}
Nav.propTypes = {
  searchUpdate: PropTypes.func.isRequired,
};

export default Nav;
