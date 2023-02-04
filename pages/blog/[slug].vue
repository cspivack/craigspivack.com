<template>
  <div class="container">
    <article id="article">
      <ContentDoc v-slot="{ doc }">
        <h1>
          {{ doc.title }}
        </h1>
        <div class="date">
          {{ useDateFormat(doc.date) }}
        </div>
        <ContentRenderer :value="doc" class="post-body" />
      </ContentDoc>
    </article>
  </div>
</template>

<script setup>

</script>
