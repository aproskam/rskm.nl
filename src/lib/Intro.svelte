<script>
  import NestedRichText from "./NestedRichText.svelte";

  export let fields;
</script>

<section>
  <div>
    <img width="200" height="300" src={fields.introImage.fields.file.url} alt={fields.introImage.fields.title} />
  </div>

  <NestedRichText richTextData={fields.introText} />
</section>
