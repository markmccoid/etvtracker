import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';

import './globalstyles';
import AppRouter from './AppRouter';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './store/configureStore';

import { startLogin } from './store/auth';



require('dotenv').config();

// Configure Redux Store
let store = configureStore();

// Initial JSX
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

store.dispatch(startLogin('EMAIL', 'mark@test.com', 'lorimcco'))

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
