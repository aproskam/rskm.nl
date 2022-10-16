<script>
  import ImagineFigure from "$lib/Imagine/ImagineFigure.svelte"
  import NestedRichText from "$lib/NestedRichText.svelte";

export let data;

const caseData = data.workCaseData.fields;
</script>

<svelte:head>
	<title>{caseData.seoTitle}</title>
	<meta name="description" content={caseData.seoDescription} />
</svelte:head>

{#if data.status === 200}
  <article class="-mt-14">
    <div class="relative">
      <ImagineFigure 
        imageData={caseData.hero.fields}
        customClassFigure={"aspect-w-16 aspect-h-12 lg:aspect-h-5"} 
        customClassImg={"lg:absolute inset-0 w-full h-full max-w-none object-contain"}
        customStyleFigure={`background-color: ${caseData.heroImageBackgroundColorCode};`}
      />
      
      <header
        class="case__header absolute left-4 lg:left-20 bottom-10"
        style={`color: ${caseData.caseBackgroundColorCode};`}
      >
        <h1>{caseData.title}</h1>
        <h2>{caseData.subheader}</h2>
      </header>
    </div>

    <div class="w-11/12 lg:w-2/4 mx-auto mt-8 style--nested-copy">
      <NestedRichText richTextData={caseData.intro} />
    </div>

    <div class="w-11/12 lg:w-2/4 mx-auto mt-8 style--nested-copy">
      <NestedRichText richTextData={caseData.body} />
    </div>

    {#if caseData.video}
      <div class="w-11/12 lg:w-2/4 mx-auto my-8">
        <video
          controls
          muted
          loop
          src={caseData.video.fields.file.url}
        ></video>
      </div>
    {/if}
  </article>
{/if}
