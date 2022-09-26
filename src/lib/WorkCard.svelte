<script>
  export let work;
  $: console.log("work ", work);
</script>

<div>
  <h2>{work.title}</h2>
</div>
