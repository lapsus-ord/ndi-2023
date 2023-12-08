<script lang="ts">
  import '../app.postcss';
  import { AppShell, AppBar, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

  export const ssr = false;
  export const csr = true;
  export const prerender = false;

  function changePreset(e: Event) {
    document.body.setAttribute('data-theme', e.target.value);
  }

  function setBodyThemeAttribute(): void {}
  setBodyThemeAttribute();

  let value: string = 'skeleton';
</script>

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
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <slot />
</AppShell>
