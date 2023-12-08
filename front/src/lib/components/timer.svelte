<script>
  let counter = 60;
  let num = 1;
  function count() {
    counter = counter - 1;
  }

  setInterval(count, 1000);
</script>

<div class="flex flex-col w-1/6 h-20 p-6 justify-center text-center">
  <span>
    Question numéro {num}
  </span>
  <div>Temps restant : 00:{counter}</div>
</div>
