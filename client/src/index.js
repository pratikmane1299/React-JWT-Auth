import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootswatch/dist/lumen/bootstrap.css'
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/auth';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
