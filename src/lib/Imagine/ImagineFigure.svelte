<script>
  import { onMount } from 'svelte';
  import linkGenerator from './Imagine.helper'

  export let customClassFigure;
  export let customStyleFigure;
  export let customClassImg;
  export let imageData = {};
  export let imgLoading = 'lazy';
  export let sizes = '100vw';
  export let transforms = [];
  export let width = '100';
  export let height = '100';

  let imgSrcSetAvif = '';
  let imgSrcSetWebp = '';
  let imgSrcSetJpg = '';
  let imgSrc = '';

  onMount(() => {
    const imgFile = imageData.file.url;

    transforms.forEach((transform, index) => {
      const transformValues = transform.split('x');
      const tWidth = transformValues[0];
      const tHeight = transformValues[1];
      const linkGeneratorParams = `&fit=fill&f=face&q=80&w=${tWidth}${tHeight === '0' ? '' : `&h=${tHeight}`}`;
      if (index > 0) {
        imgSrcSetAvif = imgSrcSetAvif + `${linkGenerator(imgFile, `fm=avif${linkGeneratorParams}`)} ${tWidth}w${index + 1 === transforms.length ? '' : ', '}`;
        imgSrcSetWebp = imgSrcSetWebp + `${linkGenerator(imgFile, `fm=webp${linkGeneratorParams}`)} ${tWidth}w${index + 1 === transforms.length ? '' : ', '}`;
        imgSrcSetJpg = imgSrcSetJpg + `${linkGenerator(imgFile, `fm=jpg&fl=progressive${linkGeneratorParams}`)} ${tWidth}w${index + 1 === transforms.length ? '' : ', '}`;
      } else {
        imgSrc = `${linkGenerator(imgFile, `fm=jpg&fl=progressive${linkGeneratorParams}`)}`;
      }
    });
  });
</script>

<style>
  img {
    aspect-ratio: var(--img-width) / var(--img-height);
  }
</style>

<figure
  class={customClassFigure}
  style={customStyleFigure}
>
  <img
    {width}
    {height}
    style={`--img-width: ${width}; --img-height: ${height}`}
    sizes="(min-width: 60em) 33.33vw,100vw"
    src={imageData.file.url}
    alt={imageData.title}  
    class={customClassImg}
  />
</figure>
