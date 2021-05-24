<template>
  <main class="-mt-14">
    <section
      class="
        flex flex-col
        lg:flex-row
        justify-center
        h-screen
        w-screen
        items-center
      "
    >
      <div class="lg:block w-full lg:w-1/3 lg:h-full relative mb-8 lg:mb-0">
        <img
          sizes="33vw"
          :src="
            $options.filters.transformImage(
              story.content.Hero.filename,
              '100x100/smart'
            )
          "
          alt=""
          :srcset="`
              ${$options.filters.transformImage(
                story.content.Hero.filename,
                '400x400/smart'
              )} 400w,
              ${$options.filters.transformImage(
                story.content.Hero.filename,
                '800x800/smart'
              )} 800w,
              ${$options.filters.transformImage(
                story.content.Hero.filename,
                '1200x1200/smart'
              )} 1200w
            `"
          class="lg:hidden rounded-full max-w-none mx-auto object-cover"
        />
        <img
          :src="
            $options.filters.transformImage(
              story.content.Hero.filename,
              '100x0'
            )
          "
          alt=""
          :srcset="`
              ${$options.filters.transformImage(
                story.content.Hero.filename,
                '400x0'
              )} 400w,
              ${$options.filters.transformImage(
                story.content.Hero.filename,
                '800x0'
              )} 800w,
              ${$options.filters.transformImage(
                story.content.Hero.filename,
                '1200x0'
              )} 1200w
            `"
          class="
            hidden
            lg:block
            lg:rounded-none
            lg:absolute
            lg:inset-0
            lg:w-full
            lg:h-full
            max-w-none
            object-cover
          "
        />
      </div>

      <div class="lg:w-2/3 p-4 lg:p-16 style--nested-copy">
        <rich-text-renderer :document="story.content.Intro">
        </rich-text-renderer>
      </div>
    </section>

    <WorkOverview />
  </main>
</template>
<script>
import WorkOverview from '~/components/workOverview.vue'

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
  components: {
    WorkOverview,
  },
  asyncData(context) {
    const editMode = EditModeState(context)
    const version = editMode ? 'draft' : 'published'
    const path = context.route.path === '/' ? '/homepage' : context.route.path
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
      stories: {},
    }
  },
  async fetch(context) {
    const editMode = EditModeState(context)
    // Loading reference data - Work in our case
    if (context.store.state.work.loaded !== '1') {
      const version = editMode ? 'draft' : 'published'
      const path = context.route.path === '/' ? '/' : context.route.path
      const workRefRes = await loadData({
        version,
        api: context.app.$storyapi,
        accessToken: context.$config.storyblokAccessToken,
        cacheVersion: context.$config.storyblokCacheProvider,
        errorCallback: context.error,
        path,
        startsWith: 'work/',
      })
      context.store.commit('work/setWork', workRefRes.stories)
      context.store.commit('work/setLoaded', '1')
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

<style lang="postcss">
html,
body {
  scroll-snap-type: y mandatory;
}

section {
  scroll-snap-align: start;
}
</style>
