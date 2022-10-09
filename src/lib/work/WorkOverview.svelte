<script>
  import WorkTeaser from "./WorkTeaser.svelte";

  export let cases;
</script>

{#each cases as work}
  <WorkTeaser work={work.fields} />
{/each}
