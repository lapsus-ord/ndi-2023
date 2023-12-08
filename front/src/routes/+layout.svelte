<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.postcss';
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  import { AppShell, AppBar, storePopup, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
  import type { Auth0Client } from '@auth0/auth0-spa-js';
  import auth from '$lib/auth/authService';
  import { isAuthenticated, user } from '$lib/auth/store';
  import UserDropdownMenu from '$lib/components/user-dropdown-menu.svelte';

  export const ssr = false;
  export const csr = true;
  export const prerender = false;

  let value = 'skeleton';
  function setBodyThemeAttribute(): void {}
  setBodyThemeAttribute();

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

  function changePreset(e: Event) {
    document.body.setAttribute('data-theme', (e.target as HTMLInputElement).value);
  }
</script>

<svelte:head>
  <title>Chat Noir Project</title>
</svelte:head>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <strong class="text-xl uppercase">🐈‍⬛ Chat Noir Project</strong>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <RadioGroup>
          <RadioItem bind:group={value} name="justify" value="skeleton" on:click={(e) => changePreset(e)}>skeleton</RadioItem>
          <RadioItem bind:group={value} name="justify" value="crimson" on:click={(e) => changePreset(e)}>crimson</RadioItem>
          <RadioItem bind:group={value} name="justify" value="wintry" on:click={(e) => changePreset(e)}>wintry</RadioItem>
          <RadioItem bind:group={value} name="justify" value="modern" on:click={(e) => changePreset(e)}>modern</RadioItem>
        </RadioGroup>
        <a class="btn btn-sm variant-ghost-surface" href="https://github.com/lapsus-ord/ndi-2023" target="_blank" rel="noreferrer"> GitHub </a>
        {#if isLoginLoading}
          <button type="button" class="btn variant-ghost-surface w-48">
            <div class="placeholder" />
          </button>
        {:else if $isAuthenticated}
          <UserDropdownMenu {user} onLogout={logout} />
        {:else}
          <button type="button" class="btn variant-ghost-surface" on:click={login}>Se connecter</button>
        {/if}
        <!-- <a class="btn btn-sm variant-ghost-surface" href="https://github.com/lapsus-ord/ndi-2023" target="_blank" rel="noreferrer">GitHub</a> -->
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <slot />
</AppShell>
