<template>
  <section class="lg:flex lg:h-screen lg:-mt-14">
    <nuxt-link
      v-for="item in stories"
      :key="item._uid"
      :to="item.full_slug"
      class="work-case block lg:h-screen lg:flex-1 relative"
      :style="`--image-bg-color-code: ${item.content.image_bg_color_code}; --case-bg-color-code: ${item.content.case_bg_color_code};`"
    >
      <figure
        class="
          work-case__image
          aspect-w-1 aspect-h-1
          relative
          top-0
          lg:top-1/2
          lg:transform
          lg:-translate-y-2/4
        "
      >
        <img
          :sizes="`(min-width: 60em) ${viewportSizeDividedByStories}vw, 100vw`"
          :src="
            $options.filters.transformImage(item.content.hero.filename, '100x0')
          "
          :alt="item.content.hero.alt"
          :srcset="`
            ${$options.filters.transformImage(
              item.content.hero.filename,
              '400x400'
            )} 400w,
            ${$options.filters.transformImage(
              item.content.hero.filename,
              '800x800'
            )} 800w,
            ${$options.filters.transformImage(
              item.content.hero.filename,
              '1200x1200'
            )} 1200w
          `"
          class="lg:absolute inset-0 w-full h-full max-w-none object-cover"
        />
      </figure>

      <div
        class="work-case__text absolute bottom-0 w-full p-4 lg:py-8 lg:px-16"
      >
        <header class="work-case__header w-full">
          <h2>{{ item.name }}</h2>
          <h3>{{ item.content.subheader }}</h3>
        </header>
      </div>
    </nuxt-link>
  </section>
</template>

<script>
const loadData = function ({
  api,
  accessToken,
  cacheVersion,
  errorCallback,
  version,
  path,
  startsWith,
}) {
  return api
    .get(`cdn/stories/${path}`, {
      version,
      token: accessToken,
      cv: cacheVersion,
      starts_with: startsWith,
    })
    .then((response) => {
      console.log('response', response.data)
      return response.data
    })
    .catch((res) => {
      if (!res.response) {
        console.error(res)
        errorCallback({
          statusCode: 404,
          message: 'Failed to receive content form api',
        })
      } else {
        console.error(res.response.data)
        errorCallback({
          statusCode: res.response.status,
          message: res.response.data,
        })
      }
    })
}

const EditModeState = (context) => {
  // Check if we are in the editing mode
  let editMode = false
  if (
    context.query._storyblok ||
    context.isDev ||
    (typeof window !== 'undefined' &&
      window.localStorage.getItem('_storyblok_draft_mode'))
  ) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('_storyblok_draft_mode', '1')
      if (window.location === window.parent.location) {
        window.localStorage.removeItem('_storyblok_draft_mode')
      }
    }
    editMode = true
  }
  return editMode
}
export default {
  asyncData(context) {
    const editMode = EditModeState(context)
    const version = editMode ? 'draft' : 'published'
    const path = context.route.path === '/work' ? '' : context.route.path
    // Load the JSON from the API
    return loadData({
      version,
      api: context.app.$storyapi,
      accessToken: context.$config.storyblokAccessToken,
      cacheVersion: context.$config.storyblokCacheProvider,
      errorCallback: context.error,
      path,
      startsWith: 'work/',
    })
  },
  data() {
    return {
      stories: [],
      viewportSizeDividedByStories: 100,
    }
  },
  mounted() {
    // Use the input event for instant update of content
    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action === 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
        // Use the bridge to listen the events
      } else {
        // window.location.reload()
        this.$nuxt.$router.go({
          path: this.$nuxt.$router.currentRoute,
          force: true,
        })
      }
    })

    this.viewportSizeDividedByStories = 100 / this.stories.length
  },
}
</script>

<style lang="postcss" scoped>
.work-case {
  background-color: var(--image-bg-color-code);
}
.work-case__image {
  background-color: var(--image-bg-color-code);
}
.work-case__text::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--image-bg-color-code);
  opacity: 0.8;
  @media screen and (min-width: 60em) {
    display: none;
  }
}

.work-case__header {
  color: #fff;
  position: relative;
  z-index: 2;
  padding: 1rem;
}
</style>
