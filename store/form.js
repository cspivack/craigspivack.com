export const state = () => ({
  open: false
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
  }
}

export const getters = {
  open: (state) => state.open
}
