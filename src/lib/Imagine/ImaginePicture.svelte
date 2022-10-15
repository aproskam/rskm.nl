<script>
  import { onMount } from 'svelte';
  import linkGenerator from './Imagine.helper'

  export let customClass;
  export let imageData = {};
  export let imgLoading = 'lazy';
  export let transforms = [];
  export let width = '100';
  export let height = '100';

  let imgSrcSetAvif = '';
  let imgSrcSetWebp = '';
  let imgSrcSetJpg = '';
  let imgSrc = '';

  function sizeParameterGenerator(transform) {
    const transformValues = transform.split('x');
    const tWidth = transformValues[0];
    const tHeight = transformValues[1];
    return {
      'tWidth': tWidth,
      'tHeight': tHeight,
      'url': `&fit=fill&f=face&q=80&w=${tWidth}${tHeight === '0' ? '' : `&h=${tHeight}`}`
    };
  };

  onMount(() => {
    const imgFile = imageData.file.url;
    const firstTransform = transforms.slice(0, 1);
    const srcLinkGeneratorParams = sizeParameterGenerator(firstTransform[0]);
    imgSrc = `${linkGenerator(imgFile, `fm=jpg&fl=progressive${srcLinkGeneratorParams.url}`)}`;

    transforms.slice(1).forEach((transform, index) => {
      const linkGeneratorParams = sizeParameterGenerator(transform)
      imgSrcSetAvif = imgSrcSetAvif + `${linkGenerator(imgFile, `fm=avif${linkGeneratorParams.url}`)} ${linkGeneratorParams.tWidth}w${index + 1 === transforms.length ? '' : ', '}`;
      imgSrcSetWebp = imgSrcSetWebp + `${linkGenerator(imgFile, `fm=webp${linkGeneratorParams.url}`)} ${linkGeneratorParams.tWidth}w${index + 1 === transforms.length ? '' : ', '}`;
      imgSrcSetJpg = imgSrcSetJpg + `${linkGenerator(imgFile, `fm=jpg&fl=progressive${linkGeneratorParams.url}`)} ${linkGeneratorParams.tWidth}w${index + 1 === transforms.length - 1 ? '' : ', '}`;
    });
  });
</script>

<picture>
  <source 
    srcset={imgSrcSetAvif} 
    type="image/avif"
  >
  <source 
    srcset={imgSrcSetWebp} 
    type="image/webp"
  >
  <source 
    srcset={imgSrcSetJpg} 
    type="image/jpg"
  >
  <img 
    {width}
    {height}
    src={imgSrc}
    alt={imageData.title}
    loading={imgLoading}
    class={customClass}
  >
</picture>

