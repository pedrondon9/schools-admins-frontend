


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { LicenseInfo } from '@mui/x-license-pro';
//import { KEY_UI } from './contexts/constantesVar';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.REACT_APP_NODE_ENVA === 'production') {
  disableReactDevTools();
}






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

