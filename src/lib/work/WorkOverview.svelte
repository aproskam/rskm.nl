<script>
  import WorkTeaser from "./WorkTeaser.svelte";

  export let cases;
</script>

{#each cases as work}
  <section>
    <WorkTeaser work={work.fields} />
  </section>
{/each}
