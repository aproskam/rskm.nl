<script>
	import Intro from '$lib/Intro.svelte';
  import WorkOverview from '$lib/work/WorkOverview.svelte';

	export let data;
</script>

<svelte:head>
	<title>{data.fields.seoTitle}</title>
	<meta name="description" content={data.fields.seoDescription} />
</svelte:head>

<Intro fields={data.fields} />
<WorkOverview cases={data.workData} />
