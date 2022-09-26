<script>
  import WorkCard from "./WorkCard.svelte";

  export let cases;
</script>

<section>
  {#each cases as work}
    <WorkCard work={work.fields} />
  {/each}
</section>
