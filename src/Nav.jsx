import React, { useCallback, useState } from "react";
import { Link } from "@reach/router";

import "./Nav.css";

function Nav() {
  const [query, setQuery] = useState("");
  const updateQuery = useCallback(e => setQuery(e.target.value), []);
  const submitQuery = useCallback(
    e => {
      e.preventDefault();
      alert(`you searched: ${query}`);
    },
    [query],
  );

  return (
    <header className="nav__container">
      <Link to="/">
        <img height="32px" src="img/logo.png" alt="Waterloo Oasis logo" />
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
      <Link to="/profile">
        <img height="24px" alt="user icon" src="img/user_icon.png" />
      </Link>
    </header>
  );
}

export default Nav;
