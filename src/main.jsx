import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.jsx';
import { ProvideAppContext } from './context/AppContext.jsx';
import { Auth0Provider } from '@auth0/auth0-react';

const AUTH_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN;
const AUTH_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID;

console.log('AUTH0 CHECK', AUTH_DOMAIN, AUTH_CLIENT_ID);

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={AUTH_DOMAIN}
    clientId={AUTH_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <ProvideAppContext>
      <App />
    </ProvideAppContext>
  </Auth0Provider>
);
