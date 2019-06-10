import React, { useCallback } from "react";
import { navigate } from "@reach/router";

import "./SignIn.css";

function SignIn() {
  const mockSignIn = useCallback(e => {
    e.preventDefault();
    alert("pretend this is a auth portal");
    navigate("/");
  }, []);

  return (
    <section className="signin__container">
      <img width="200px" alt="Waterloo Oasis logo" src="img/logo_dots.png" />
      <h2 className="signin__subheader">
        Stay woke on that WaterlooWorks shit
      </h2>
      <a className="signin__button" href="" onClick={mockSignIn}>
        Sign in via WatIAM
      </a>
    </section>
  );
}

export default SignIn;
