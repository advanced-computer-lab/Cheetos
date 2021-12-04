import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './app';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter > ,
  document.getElementById('root')
);


