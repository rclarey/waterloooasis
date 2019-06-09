import React from "react";

import Home from "./Home";
import Nav from "./Nav";

import fakeData from "./fakeData";

function App() {
  return (
    <>
      <Nav />
      <Home trending={fakeData} />
    </>
  );
}

export default App;
