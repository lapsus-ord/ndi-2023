<script lang="ts">
  import type { Fact } from '$lib/types/fact.type';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let fact: Fact;
  export let hasSucceeded: boolean | null;

  function onResponseValidate(userResponse: boolean) {
    if (hasSucceeded !== null) return;
    dispatch('factResponse', { userResponse });
  }

  function onNextFact() {
    dispatch('onNextFact');
  }
</script>

<div class="w-1/2 p-2 space-y-6">
  <div class="h-10 flex justify-center text-lg">
    {fact.fact}
  </div>
  <div class="gap-2 grid grid-cols-2">
    <button class="h-full p-2 w-full chip text-lg variant-filled focus:bg-red-600" on:click={() => onResponseValidate(false)}>
      <strong>FAUX</strong>
    </button>
    <button class="h-full p-2 w-full chip text-lg variant-filled focus:bg-green-600" on:click={() => onResponseValidate(false)}>
      <strong>VRAI</strong>
    </button>
  </div>
  {#if hasSucceeded !== null && hasSucceeded === true}
    <div class="text-xl font-bold">✅ Bravo&nbsp;! C'est la bonne réponse&nbsp;! 👏</div>
  {:else if hasSucceeded !== null && hasSucceeded === false}
    <div class="text-xl font-bold">❌ Ah mince... Ce n'est pas tout à fait ça. 😢</div>
  {/if}
  {#if hasSucceeded !== null}
    <div class="text-xl">
      <strong>Explication :</strong>
      <div>{fact.explanation}</div>
    </div>
    <button class="btn btn-lg variant-filled-primary" on:click={onNextFact}>⏭️&nbsp;Continuer</button>
  {/if}
</div>
