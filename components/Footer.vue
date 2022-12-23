<template>
  <footer>
    <nuxt-link to="/" class="button">Home</nuxt-link>
    <button type="button" class="button" @click="toggleForm">Contact</button>
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
