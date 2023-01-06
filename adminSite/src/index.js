import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

import Footer from "./components/footer";


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
      <div className='content-wrap'>
          <App />
      </div>
      <div className='footer'>
          <Footer />
      </div>
  </React.StrictMode>
);
