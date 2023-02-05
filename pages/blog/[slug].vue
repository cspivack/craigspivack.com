<template>
  <div class="container">
    <article id="article">
      <ContentDoc v-slot="{ doc }">
        <h1 class="title">
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
