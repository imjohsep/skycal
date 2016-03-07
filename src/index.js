// import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';

// Render the main component into the dom
ReactDOM.render(
  <SkyBox url="/api/calendar/upcoming"/>,
  document.getElementById('content')
);
