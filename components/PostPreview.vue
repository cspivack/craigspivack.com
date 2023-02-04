<template>
  <article class="article">
    <h2 class="title">
      <nuxt-link :to="post._path">
        {{ post.title }}
      </nuxt-link>
    </h2>
    <div class="date">
      {{ useDateFormat(post.date) }}
    </div>
    <p class="excerpt">
      {{ post.excerpt }}
    </p>
  </article>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>
