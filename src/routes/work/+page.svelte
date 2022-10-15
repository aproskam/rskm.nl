<script >
  import WorkOverview from '$lib/work/WorkOverview.svelte';

  export let data;
</script>

<svelte:head>
	<title>{data.fields.seoTitle}</title>
	<meta name="description" content="About this app" />
</svelte:head>

<header class="w-screen absolute z-10 top-16 uppercase text-center">
  <h1 class="italic">{data.fields.title}</h1>
</header>
<WorkOverview cases={data.workData} />
