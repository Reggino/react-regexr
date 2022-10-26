'use strict';

var React = require('react');
var { createRoot } = require('react-dom/client');
var MainPage = require('./MainPage');

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('react-main');
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(React.createElement(MainPage));
});
