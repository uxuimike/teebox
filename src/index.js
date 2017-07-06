import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import store from './mobx';

const app = document.getElementById('app');

ReactDOM.render(
  <Provider styles={store.styles} user={store.user} calendar={store.calendar}>
    <App />
  </Provider>, app);

registerServiceWorker();
