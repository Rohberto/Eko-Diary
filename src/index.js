import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './Store';
import {GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId='791231017716-jl6nmsaou4kbgphsr6fftvaur8av5j99.apps.googleusercontent.com'>
    <BrowserRouter>
    <App />
    </BrowserRouter>
   </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);


