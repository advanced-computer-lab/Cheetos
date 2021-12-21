import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './app';
import { BrowserRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css" 
ReactDOM.render(


  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter >
  </React.StrictMode>
  ,
  document.getElementById('root')
);


