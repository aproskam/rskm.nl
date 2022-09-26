<script>
  import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

  export let fields;

  const introText = documentToHtmlString(fields.introText);
</script>

<section>
  <div>
    <img width="200" height="300" src={fields.introImage.fields.file.url} alt={fields.introImage.fields.title} />
  </div>

  <div class="style--nested-copy">
    {@html introText}
  </div>
</section>
