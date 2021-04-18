<template>
  <div>
    <Nuxt />
    <Form v-show="formOpen" :key="formKey" />
    {{ formKey }}
    <Footer />
  </div>
</template>

<script>
export default {
  computed: {
    formOpen () {
      return this.$store.getters['form/open']
    },
    formKey () {
      return 'form-' + this.$store.getters['form/count']
    }
  }
}
</script>
