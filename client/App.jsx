import React from 'react';
import { Router } from '@reach/router';

import Nav from 'Nav.jsx';

import 'App.css';

function App({ children }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}

export default App;
