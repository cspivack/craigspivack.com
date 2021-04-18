<template>
  <div>
    <Nuxt />
    <Form v-show="formOpen" />
    <Footer />
  </div>
</template>

<script>
export default {
  computed: {
    formOpen () {
      return this.$store.getters['form/open']
    }
  }
}
</script>
