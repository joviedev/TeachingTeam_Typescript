import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';       // Global styles
import App from './App';    // Root app component
import reportWebVitals from './reportWebVitals'; // Performance measurement utility

/**
 * Entry point for the React application.
 * 
 * - Creates a root DOM node using React 18's `createRoot`.
 * - Wraps the app in `React.StrictMode` for highlighting potential issues.
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // Mounting point in public/index.html
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/**
 * Performance Reporting
 * 
 * - Used to measure app performance (optional).
 * - You can pass a logging function like `console.log`
 *   or send metrics to an analytics service.
 * 
 * More info: https://bit.ly/CRA-vitals
 */
reportWebVitals();
