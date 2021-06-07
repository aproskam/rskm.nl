<template>
  <span>
    <WorkTeaser v-for="work in workCases" :key="work._uid" :work-data="work" />
  </span>
</template>

<script>
import WorkTeaser from '~/components/workTeaser.vue'
export default {
  components: {
    WorkTeaser,
  },
  data() {
    return {
      workCases: null,
    }
  },
  mounted() {
    console.log('mounted featuredWork')
    // Load reference data/content from store
    this.workCases = this.$store.state.work.cases
  },
}
</script>
