<template>
  <footer>
    <nuxt-link to="/" class="button">Home</nuxt-link>
    <button type="button" class="button" @click="toggleForm">Contact</button>
  </footer>
</template>

<script setup>
const form = useForm()
const toggleForm = () => {
  form.toggle()
}
</script>
