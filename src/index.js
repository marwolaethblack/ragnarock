import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BandSetUp from './BandSetUp';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Page = () => (
  <div>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/setUp" component={BandSetUp} />
        </div>
    </Router>
  </div>
);

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
