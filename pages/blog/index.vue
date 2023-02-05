<template>
  <main>
    <div class="container">
      <div id="blog-list">
        <h1 class="title">
          Blog
        </h1>
        <PostPreview v-for="post in posts" :post="post" />
      </div>
    </div>
  </main>
</template>

<script setup>
const posts = await queryContent('/blog').sort({ date: -1 }).find()
</script>
