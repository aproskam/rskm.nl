<script>
  import ImagineFigure from "$lib/Imagine/ImagineFigure.svelte"
  import { base } from '$app/paths';
  export let work;
</script>

<style>
  .work-case__image {
    background-color: var(--image-bg-color-code);
  }
  .work-case__text {
    background-color: var(--case-bg-color-code);
  }
  .work-case__header {
    color: #fff;
    position: relative;
    padding: 1rem;
    @media screen and (min-width: 60em) {
      padding: 1rem 2rem;
    }
  }
  .work-case__header::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: var(--image-bg-color-code);
    transform: skew(-10deg);
  }
</style>

<a 
  href={`${base}/work/${work.slug}`} 
  title={work.title} 
  class="
    work-case
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
    class="work-case__image w-full h-screen-2/4 lg:w-1/3 lg:h-full relative"
  >
    <ImagineFigure 
      imageData={work.hero.fields}
      customClassFigure={"aspect-w-1 aspect-h-1 top-1/2 transform -translate-y-2/4"} 
      customClassImg={"absolute inset-0 w-full h-full max-w-none object-cover"} 
    />
  </div>

  <div
    class="
      work-case__text
      w-full
      h-screen-2/4
      lg:w-2/3
      lg:h-screen
      p-8
      lg:p-16
    "
  >
    <header class="work-case__header transform top-1/2 -translate-y-2/4">
      <h2>{work.title}</h2>
      <h3 class="flex items-center justify-between">
        <span>{work.subheader}</span>
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path
              d="M256 0C114.837 0 0 114.837 0 256s114.837 256 256 256 256-114.837 256-256S397.163 0 256 0zm79.083 271.083L228.416 377.749A21.275 21.275 0 01213.333 384a21.277 21.277 0 01-15.083-6.251c-8.341-8.341-8.341-21.824 0-30.165L289.835 256l-91.584-91.584c-8.341-8.341-8.341-21.824 0-30.165s21.824-8.341 30.165 0l106.667 106.667c8.341 8.341 8.341 21.823 0 30.165z"
              fill="#fff"
            />
          </svg>
        </i>
      </h3>
    </header>
  </div>
</a>
