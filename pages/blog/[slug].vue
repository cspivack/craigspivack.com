<template>
  <div class="container">
    <article id="article" class="article">
      <ContentDoc v-slot="{ doc }">
        <h1 class="title">
          {{ doc.title }}
        </h1>
        <div class="date">
          {{ useDateFormat(doc.date) }}
        </div>
        <ContentRenderer :value="doc" class="post-body" />
        <hr>
        <div class="tags">
          tags: {{ doc.category.join(', ') }}
        </div>
      </ContentDoc>
    </article>
  </div>
</template>

<script setup>
import 'victormono'
</script>
