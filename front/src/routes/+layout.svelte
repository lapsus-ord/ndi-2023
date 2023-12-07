<script lang="ts">
  import '../app.postcss';
  import { AppShell, AppBar } from '@skeletonlabs/skeleton';

  export const ssr = false;
  export const csr = true;
  export const prerender = false;
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <strong class="text-xl uppercase">🐈‍⬛ Chat Noir Project</strong>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <a class="btn btn-sm variant-ghost-surface" href="https://github.com/lapsus-ord/ndi-2023" target="_blank" rel="noreferrer"> GitHub </a>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <slot />
</AppShell>
