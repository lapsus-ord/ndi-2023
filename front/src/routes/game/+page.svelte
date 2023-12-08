<script lang="ts">
  import Fact from '$lib/components/fact.svelte';
  import cat from '$lib/assets/cat.png';
  import type { Fact as FactType } from '$lib/types/fact.type';
  import { onMount } from 'svelte';

  let currentFact: FactType | undefined;
  let hasSucceeded: boolean | null = null;

  onMount(() => {
    getRandomFact().then((newFact) => (currentFact = newFact));
  });

  const apiBase = import.meta.env.VITE_API_BASE;

  async function getRandomFact(): Promise<FactType | undefined> {
    try {
      const res = await fetch(`${apiBase}/GetFact`);
      const json = (await res.json()) as FactType;

      if (res.ok) {
        return json;
      } else {
        throw new Error('api not available');
      }
    } catch (e) {
      console.error('error could not communicate with api', e);
    }
  }

  function onFactResponse(e: CustomEvent<{ userResponse: boolean }>) {
    hasSucceeded = currentFact?.truth === e.detail.userResponse;
  }
</script>

<div>
  <div class="flex h-full items-center flex-col justify-end">
    <img src={cat} alt="cat" />
    {#if currentFact !== undefined}
      <Fact
        fact={currentFact}
        on:factResponse={onFactResponse}
        {hasSucceeded}
        on:onNextFact={() => {
          hasSucceeded = null;
          getRandomFact().then((newFact) => (currentFact = newFact));
        }}
      />
    {/if}
  </div>
</div>

<style>
</style>
