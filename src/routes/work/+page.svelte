<script >
  import WorkOverview from '$lib/work/WorkOverview.svelte';

  export let data;
</script>

<svelte:head>
	<title>{data.fields.seoTitle}</title>
	<meta name="description" content="About this app" />
</svelte:head>

<section class="lg:flex lg:h-screen lg:-mt-14">
  <WorkOverview cases={data.workData} />
</section>

<style>
  .work-case {
    background-color: var(--image-bg-color-code);
  }
  .work-case__image {
    background-color: var(--image-bg-color-code);
  }
  .work-case__text::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--image-bg-color-code);
    opacity: 0.8;
    @media screen and (min-width: 60em) {
      display: none;
    }
  }
  .work-case__header {
    color: #fff;
    position: relative;
    z-index: 2;
    padding: 1rem;
  }
</style>
