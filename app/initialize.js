import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

document.addEventListener('DOMContentLoaded', () => {
  const root = (
    <App />
  );
  ReactDOM.render(root, document.getElementById('app'));
});
