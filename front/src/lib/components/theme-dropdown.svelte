<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { popup } from '@skeletonlabs/skeleton';
  import Icon from '@iconify/svelte';

  const dispatch = createEventDispatcher();

  const themes = [
    {
      emoji: '💀',
      title: 'Skeleton',
      value: 'skeleton',
    },
    {
      emoji: '🌨️',
      title: 'Wintry',
      value: 'wintry',
    },
    {
      emoji: '🤖',
      title: 'Modern',
      value: 'modern',
    },
    {
      emoji: '👔',
      title: 'Hamlindigo',
      value: 'hamlindigo',
    },
    {
      emoji: '🚀',
      title: 'Rocket',
      value: 'rocket',
    },
    {
      emoji: '🏜️',
      title: 'Sahara',
      value: 'sahara',
    },
    {
      emoji: '💫',
      title: 'Gold Nouveau',
      value: 'gold-nouveau',
    },
    {
      emoji: '📺',
      title: 'Vintage',
      value: 'vintage',
    },
    {
      emoji: '🧜‍♀️',
      title: 'Seafoam',
      value: 'seafoam',
    },
    {
      emoji: '⭕',
      title: 'Crimson',
      value: 'crimson',
    },
  ];

  function onThemeClick(themeValue: string) {
    dispatch('newTheme', themeValue);
  }
</script>

<div class="relative lg:block">
  <button class="btn btn-sm variant-ghost-surface hover:variant-soft-primary" use:popup={{ event: 'click', target: 'themes-menu' }} title="Themes">
    <Icon icon="ic:outline-palette" style="font-size: 24px" class="text-surface-300" />
  </button>

  <div class="card p-4 w-60 shadow-xl" data-popup="themes-menu">
    <nav class="list-nav">
      <ul>
        {#each themes as theme}
          <li>
            <button class="btn w-full justify-start" on:click={() => onThemeClick(theme.value)}>
              <span>{theme.emoji}</span>
              <span>{theme.title}</span>
            </button>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</div>
