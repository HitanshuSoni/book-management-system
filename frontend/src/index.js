import React from 'react';
import { createRoot } from 'react-dom'; // Import createRoot from 'react-dom'

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root')); // Create a root

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
