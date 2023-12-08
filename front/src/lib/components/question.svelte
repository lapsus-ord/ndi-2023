<script>
  import QuestionButtons from './question_buttons.svelte';

  let test2 = '';

  function handleSubmit() {
    console.log(test2);
  }
</script>

<div class="w-1/2 p-2 space-y-6">
  <div class="h-10 flex justify-center">
    <span class="">Quel est la capitale de l'Asie ?</span>
  </div>
  <div class="gap-2 grid grid-cols-2">
    <QuestionButtons />
  </div>
  <div class="flex justify-center space-x-4">
    <button class="btn variant-filled" data-sveltekit-preload-data="hover" on:click={handleSubmit}>Valider</button>
    <button class="btn variant-filled" data-sveltekit-preload-data="hover">Passer ⏩</button>
  </div>
</div>
