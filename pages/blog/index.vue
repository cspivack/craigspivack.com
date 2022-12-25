<template>
  <main>
    <div class="container">
      main blog page
    </div>
  </main>
</template>

<script setup>
const posts = await queryContent('/blog').find()
console.log(posts)
</script>
