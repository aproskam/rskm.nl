<script>
	import Intro from '$lib/Intro.svelte';
  import WorkOverview from '$lib/work/WorkOverview.svelte';

	export let data;

  $: console.log("HP: ", data);
</script>

<svelte:head>
	<title>{data.fields.seoTitle}</title>
	<meta name="description" content="" />
</svelte:head>

<section>
  <Intro fields={data.fields} />
  <WorkOverview cases={data.workData} />
</section>
