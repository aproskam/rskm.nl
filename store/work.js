export const state = () => ({
  cases: [],
  loaded: '0',
})

export const mutations = {
  setWork(state, entries) {
    state.cases = entries
  },

  setLoaded(state, loaded) {
    state.loaded = loaded
  },
}
