import React from "react";

import Home from "./Home";
import Nav from "./Nav";

import fakeData from "./fakeData";

function App() {
  return (
    <React.Fragment>
      <Nav />
      <Home trending={fakeData} />
    </React.Fragment>
  );
}

export default App;
