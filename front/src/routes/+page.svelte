<script lang="ts">
  import Leaderboard from '$lib/components/leaderboard.svelte';
</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-10 text-center flex flex-col items-center w-full">
    <h2 class="h2">Chat Noir FTW</h2>
    <a href="/game" class="btn btn-xl variant-filled">Jouer</a>
    <section class="leaderboard-section">
      <Leaderboard />
    </section>
  </div>
</div>

<style lang="postcss">
  .leaderboard-section {
    width: 100%;
    max-width: 600px;
  }
</style>
