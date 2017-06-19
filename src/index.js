import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import store from './redux/store';

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, app);
registerServiceWorker();
