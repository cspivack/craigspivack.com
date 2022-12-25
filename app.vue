<template>
  <div>
    <NuxtPage />
    <Form :key="'form-' + form.count" />
    <Footer />
  </div>
</template>

<script setup>
const form = useForm()
</script>
