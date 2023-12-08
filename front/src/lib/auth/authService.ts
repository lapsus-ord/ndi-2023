import { createAuth0Client, type Auth0ClientOptions, Auth0Client, type RedirectLoginOptions, type LogoutOptions } from '@auth0/auth0-spa-js';
import { isAuthenticated, user } from '$lib/auth/store';

const config: Auth0ClientOptions = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENTID,
  useRefreshTokens: true,
  cacheLocation: 'localstorage',
};

async function createClient(): Promise<Auth0Client> {
  return createAuth0Client(config);
}

async function loginWithRedirect(client: Auth0Client, options?: RedirectLoginOptions) {
  try {
    await client.loginWithRedirect(options);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  }
}

function logout(client: Auth0Client, options?: LogoutOptions) {
  return client.logout(options);
}

async function loadUser(client: Auth0Client) {
  isAuthenticated.set(true);
  user.set((await client.getUser()) ?? null);
}

const auth = {
  createClient,
  loginWithRedirect,
  logout,
  loadUser,
};

export default auth;
