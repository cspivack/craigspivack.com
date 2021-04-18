<template>
  <footer>
    <nuxt-link to="/">Home</nuxt-link>
    <button type="button" @click="toggleForm">Contact</button>
  </footer>
</template>

<script>
export default {
  methods: {
    toggleForm () {
      this.$store.commit('form/toggle')
    }
  }
}
</script>
