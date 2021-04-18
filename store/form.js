export const state = () => ({
  open: false,
  count: 0
})

export const mutations = {
  toggle(state) {
    state.open = !state.open
  },
  open(state) {
    state.open = true
  },
  close(state) {
    state.open = false
  },
  increment(state) {
    state.count++
  }
}

export const getters = {
  open: (state) => state.open,
  count: (state) => state.count
}
