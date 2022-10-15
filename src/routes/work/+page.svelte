<script >
  import WorkOverview from '$lib/work/WorkOverview.svelte';

  export let data;
</script>

<svelte:head>
	<title>{data.fields.seoTitle}</title>
	<meta name="description" content="About this app" />
</svelte:head>

<header class="w-screen absolute top-16 left-2 text-center">
  <h1>{data.fields.title}</h1>
</header>
<WorkOverview cases={data.workData} />
