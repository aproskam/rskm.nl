<script>
  import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
  
  export let richTextData;

  const introText = documentToHtmlString(richTextData);
</script>

<div class="style--nested-copy">
  {@html introText}
</div>
