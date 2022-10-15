<script>
  import ImagineFigure from "$lib/Imagine/ImagineFigure.svelte"
  import { base } from '$app/paths';
  export let work;
</script>

<style>
  .work-case {
    background-color: var(--image-bg-color-code);
  }
  .work-case__header {
    color: var(--case-bg-color-code);
    position: relative;
    padding: 1rem;
    @media screen and (min-width: 60em) {
      padding: 1rem 2rem;
    }
  }

  .work-case__button {
    background-color: var(--case-bg-color-code);

    span {
      color: var(--image-bg-color-code)
    }
    .button__icon {
      transform: scale3d(1.05,1.05,1.05);
    }
  }
</style>

<a 
  href={`${base}/work/${work.slug}`} 
  title={work.title} 
  class="
    work-case
    relative
    flex 
    flex-col
    justify-center
    lg:flex-row
    lg:h-screen
    w-screen
    items-center
    bg-yellow-200
  " 
  style={`--image-bg-color-code: ${work.heroImageBackgroundColorCode}; --case-bg-color-code: ${work.caseBackgroundColorCode};`}
>
  <div
    class="work-case__image flex flex-col lg:flex-row items-center lg:justify-around w-full h-screen relative"
  >
    <ImagineFigure 
      imageData={work.hero.fields}
      customClassFigure={"lg:max-w-lg"} 
      customClassImg={"w-full h-full max-w-none object-cover"} 
    />
 
    <header class="work-case__header">
      <h2>{work.title}</h2>
      <h3 class="flex items-center justify-between">
        <span>{work.subheader}</span>
      </h3>
    </header>
  </div>

  <button 
    type="button"
    title="Read more"
    class="work-case__button absolute bottom-8 right-4 lg:bottom-16 lg:right-16 rounded-full flex items-center pl-4"
  >
    <span class="mr-2 uppercase">Read more</span>
    <i class="button__icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 512 512"
      >
        <path
          d="M256 0C114.837 0 0 114.837 0 256s114.837 256 256 256 256-114.837 256-256S397.163 0 256 0zm79.083 271.083L228.416 377.749A21.275 21.275 0 01213.333 384a21.277 21.277 0 01-15.083-6.251c-8.341-8.341-8.341-21.824 0-30.165L289.835 256l-91.584-91.584c-8.341-8.341-8.341-21.824 0-30.165s21.824-8.341 30.165 0l106.667 106.667c8.341 8.341 8.341 21.823 0 30.165z"
          fill="var(--image-bg-color-code)"
        />
      </svg>
    </i>
  </button>
</a>
