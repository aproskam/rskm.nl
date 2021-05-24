<template>
  <article class="-mt-14">
    <div class="relative">
      <figure
        class="aspect-w-16 aspect-h-5"
        :style="`background-color: ${story.content.image_bg_color_code}`"
      >
        <img
          :src="
            $options.filters.transformImage(
              story.content.hero.filename,
              '100x100'
            )
          "
          :srcset="` ${$options.filters.transformImage(
            story.content.hero.filename,
            '400x400'
          )} 400w,
      ${$options.filters.transformImage(
        story.content.hero.filename,
        '800x800'
      )} 800w, ${$options.filters.transformImage(
            story.content.hero.filename,
            '1200x1200'
          )} 1200w `"
          :alt="story.content.hero.alt"
          class="lg:absolute inset-0 w-full h-full max-w-none object-contain"
        />
      </figure>

      <header
        class="case__header absolute left-20 bottom-10"
        :style="`color: ${story.content.case_bg_color_code}`"
      >
        <h1>{{ story.name }}</h1>
        <h2>{{ story.content.subheader }}</h2>
      </header>
    </div>

    <div class="w-2/4 mx-auto mt-8 style--nested-copy">
      <rich-text-renderer :document="story.content.intro"> </rich-text-renderer>
    </div>

    <div class="w-2/4 mx-auto mt-8 style--nested-copy">
      <rich-text-renderer :document="story.content.content">
      </rich-text-renderer>
    </div>

    <div v-if="story.content.video" class="w-2/4 mx-auto mt-8">
      <video
        autoplay
        playsinline
        muted
        loop
        :src="story.content.video.filename"
      ></video>
    </div>
  </article>
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
    const path =
      context.route.path === `work/${context.params.slug}`
        ? `work/${context.params.slug}`
        : context.route.path
    // Load the JSON from the API
    return loadData({
      version,
      api: context.app.$storyapi,
      accessToken: context.$config.storyblokAccessToken,
      cacheVersion: context.$config.storyblokCacheProvider,
      errorCallback: context.error,
      path,
      startsWith: '',
    })
  },
  data() {
    return {
      story: { content: {} },
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
  },
}
</script>
