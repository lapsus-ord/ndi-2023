<script>
  import Question from '$lib/components/question.svelte';
  import Timer from '$lib/components/timer.svelte';
  import cat from '$lib/assets/cat.png';
</script>

<div>
  <div class="flex justify-end flex-col">
    <Timer />
  </div>
  <div class="flex h-full items-center flex-col justify-end">
    <img src={cat} alt="cat" />
    <Question />
  </div>
</div>

<style>
</style>
