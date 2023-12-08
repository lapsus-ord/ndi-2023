<script>
  let button = '';
  /**
   * @type {string}
   */
</script>

{#each ['A', 'B', 'C', 'D'] as c}
  <button
    class="h-full p-2 w-full chip {button === c ? 'variant-filled' : 'variant-soft'}"
    on:click={() => {
      button = c;
    }}
    on:keypress
  >
    <span>{c}</span>
  </button>
{/each}
