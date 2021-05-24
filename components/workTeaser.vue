<template>
  <nuxt-link :to="workData.full_slug">
    <section
      class="work-case flex flex-col justify-center lg:flex-row lg:h-screen w-screen items-center bg-yellow-200"
      :style="`--image-bg-color-code: ${workData.content.image_bg_color_code}; --case-bg-color-code: ${workData.content.case_bg_color_code};`"
    >
      <div
        class="work-case__image w-full h-screen-2/4 lg:w-1/3 lg:h-full relative"
      >
        <figure
          class="aspect-w-1 aspect-h-1 top-1/2 transform -translate-y-2/4"
        >
          <img
            sizes="(min-width: 60em) 33.33vw,100vw"
            :src="
              $options.filters.transformImage(
                workData.content.hero.filename,
                '100x100'
              )
            "
            :alt="workData.content.hero.alt"
            :srcset="`
              ${$options.filters.transformImage(
                workData.content.hero.filename,
                '400x400'
              )} 400w,
              ${$options.filters.transformImage(
                workData.content.hero.filename,
                '800x800'
              )} 800w,
              ${$options.filters.transformImage(
                workData.content.hero.filename,
                '1200x1200'
              )} 1200w
            `"
            class="absolute inset-0 w-full h-full max-w-none object-cover"
          />
        </figure>
      </div>

      <div
        class="work-case__text w-full h-screen-2/4 lg:w-2/3 lg:h-screen p-8 lg:p-16"
      >
        <header class="work-case__header transform top-1/2 -translate-y-2/4">
          <h2>{{ workData.name }}</h2>
          <h3>{{ workData.content.subheader }}</h3>
        </header>
      </div>
    </section>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    workData: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="postcss" scoped>
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
