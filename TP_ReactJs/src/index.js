import React from 'react';
import ReactDOM from 'react-dom';
import { Router, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import history from './history';
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <HashRouter>
        <App />
      </HashRouter>
    </Router>
  </Provider>
, document.getElementById('root'));
