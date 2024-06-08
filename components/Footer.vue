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
        href="https://hachyderm.io/@cspivack"
        rel="me"
        target="_blank"
        aria-label="Mastodon profile"
        class="social-link mastodon"
      >
        <Mastodon />
      </a>
    </div>
  </footer>
</template>

<script setup>
import Mastodon from '~/components/Icons/Mastodon'
import Rss from '~/components/Icons/Rss'
const form = useForm()
const toggleForm = () => {
  form.toggle()
}
</script>
