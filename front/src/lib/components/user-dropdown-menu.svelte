<script lang="ts">
  import type { User } from '@auth0/auth0-spa-js';
  import Icon from '@iconify/svelte';
  import { popup, Avatar } from '@skeletonlabs/skeleton';
  import type { Writable } from 'svelte/store';

  export let user: Writable<User | null>;
  export let onLogout: () => void;
</script>

<div class="relative lg:block">
  {#if $user}
    <button class="btn variant-ghost-surface hover:variant-soft-primary" use:popup={{ event: 'click', target: 'user-menu' }}>
      <div class="flex items-center gap-2 text-surface-100">
        <span>{$user.nickname}</span>
        <Avatar src={$user.picture} width="w-6" rounded="rounded-full" />
      </div>
    </button>

    <div class="card p-4 w-60 shadow-xl" data-popup="user-menu">
      <nav class="list-nav">
        <ul>
          <li>
            <button class="btn w-full justify-start" on:click={onLogout}>
              <Icon icon="humbleicons:logout" style="font-size: 24px;" />
              <span>Se déconnecter</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  {/if}
</div>
