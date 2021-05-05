import React from 'react';
import ReactDOM from 'react-dom';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'assets/css/material-dashboard-react.css?v=1.9.0';
import 'react-toastify/dist/ReactToastify.css';
import App from './container/App';
import { AppProvider } from '../src/store/store';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,

  document.getElementById('root'),
);
