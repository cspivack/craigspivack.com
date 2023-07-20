<template>
  <footer id="footer">
    <div id="footer-left">
      <nuxt-link to="/" class="button">Home</nuxt-link>
      <nuxt-link to="/blog" class="button">Blog</nuxt-link>
      <button type="button" class="button" @click="toggleForm">Contact</button>
    </div>
    <div id="footer-right">
      <a
        href="https://www.craigspivack.com/blog/rss.xml"
        target="_blank"
        aria-label="RSS feed"
        class="social-link rss"
      >
        <Rss />
      </a>
      <a
        href="https://social.craigspivack.com/@craig"
        rel="me"
        target="_blank"
        aria-label="Social profile"
        class="social-link activity-pub"
      >
        <ActivityPub />
      </a>
    </div>
  </footer>
</template>

<script setup>
import ActivityPub from '~/components/Icons/ActivityPub'
import Rss from '~/components/Icons/Rss'
const form = useForm()
const toggleForm = () => {
  form.toggle()
}
</script>
