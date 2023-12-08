<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.postcss';
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { AppShell, AppBar, storePopup, LightSwitch } from '@skeletonlabs/skeleton';
  import type { Auth0Client } from '@auth0/auth0-spa-js';
  import Icon from '@iconify/svelte';
  import auth from '$lib/auth/authService';
  import { isAuthenticated, user } from '$lib/auth/store';
  import UserDropdownMenu from '$lib/components/user-dropdown-menu.svelte';
  import ThemeDropdown from '$lib/components/theme-dropdown.svelte';

  export const ssr = false;
  export const csr = true;
  export const prerender = false;

  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

  let auth0Client: Auth0Client | undefined;
  let isLoginLoading = true;

  onMount(async () => {
    auth0Client = await auth.createClient();
    const isAuth = await auth0Client?.isAuthenticated();
    const query = window.location.search;

    if (isAuth) {
      await auth.loadUser(auth0Client);
    } else if (query.includes('code=') && query.includes('state=')) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, document.title, '/');
      await auth.loadUser(auth0Client);
    }
    isLoginLoading = false;
  });

  function login() {
    if (auth0Client === undefined) return;
    auth.loginWithRedirect(auth0Client, {
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    });
  }

  function logout() {
    if (auth0Client === undefined) return;
    auth.logout(auth0Client, {
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }

  function changePreset(e: CustomEvent) {
    document.body.setAttribute('data-theme', e.detail);
  }
</script>

<svelte:head>
  <title>Chat Noir Project</title>
</svelte:head>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <a href="/">
          <span class="text-3xl">🐈‍⬛</span>
          <strong class="text-xl uppercase hover:underline underline-offset-4 decoration-2">Chat Noir Project</strong>
        </a>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <LightSwitch />
        <a class="btn btn-sm variant-ghost-surface" href="https://github.com/lapsus-ord/ndi-2023" target="_blank" title="Github source">
          <Icon icon="mingcute:github-line" style="font-size: 24px" class="text-surface-300" />
          <Icon icon="mingcute:external-link-line" style="font-size: 20px" class="text-surface-300" />
        </a>
        <ThemeDropdown on:newTheme={(theme) => changePreset(theme)} />

        {#if isLoginLoading}
          <button type="button" class="btn variant-ghost-surface w-48">
            <div class="placeholder" />
          </button>
        {:else if $isAuthenticated}
          <UserDropdownMenu {user} onLogout={logout} />
        {:else}
          <button type="button" class="btn variant-ghost-surface" on:click={login}>Se connecter</button>
        {/if}
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <slot />
</AppShell>
