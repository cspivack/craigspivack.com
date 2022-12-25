<template>
  <footer id="footer">
    <div id="footer-left">
      <nuxt-link to="/" class="button">Home</nuxt-link>
      <button type="button" class="button" @click="toggleForm">Contact</button>
    </div>
    <div id="footer-right">
      <a
        href="https://phpc.social/@craig"
        rel="me"
        target="_blank"
        aria-label="Mastodon profile"
      >
        <img
          src="/mastodon.svg"
          width="20"
          height="21"
          alt="Mastodon logo"
        >
      </a>
    </div>
  </footer>
</template>

<script setup>
const form = useForm()
const toggleForm = () => {
  form.toggle()
}
</script>
