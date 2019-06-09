import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";

import App from "./App";
import SignIn from "./SignIn";

import "./index.css";

ReactDOM.render(
  <Router>
    <App path="/" />
    <SignIn path="/signin" />
  </Router>,
  document.body,
);
