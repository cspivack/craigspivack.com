<template>
  <transition name="bounce">
    <div class="modal popup">
      <form method="POST" id="contact-form" ref="form" @submit.prevent="handleSubmit">

        <div class="topbar">
          <div class="title">Contact Me</div>

          <button ref="close" class="close" type="button" @click.prevent="close"><div></div></button>
        </div>

        <div v-if="message" :class="['message', (hasErrors ? 'error' : 'success')]" v-html="message" />

        <div v-if="!complete" class="form-inner">

          <label for="name">Name</label>
          <input type="text" name="name" id="name">
          <small v-if="errors.name" class="error">
            {{ errors.name }}
          </small>

          <label for="email">Email</label>
          <input type="email" name="email" id="email">
          <small v-if="errors.email" class="error">
            {{ errors.email }}
          </small>

          <label for="message">Message</label>
          <textarea name="message" id="message" />
          <small v-if="errors.message" class="error">
            {{ errors.message }}
          </small>

          <input type="hidden" name="form-name" value="contact-form">

          <button type="submit" :disabled="loading">Send</button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      errors: {},
      errorBool: false,
      message: null,
      complete: false,
      loading: false
    }
  },
  computed: {
    hasErrors () {
      return this.errorBool || Object.keys(this.errors).length
    }
  },
  methods: {
    close () {
      this.$store.commit('form/close')
      this.$store.commit('form/increment')
    },
    async handleSubmit() {
      const form = this

      form.loading = true;

      const formData = new FormData(form.$refs.form);

      try {
        const response = await axios.post('/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        form.errorBool = false
        form.message = 'Thanks! I’ll try to get back to you as soon as possible.'
        form.complete = true
      } catch (e) {
        form.message = 'Hmm, there was an error with your submission. Please check your submission below and try again.'
        form.errorBool = true
      }

      form.loading = false
    },
    focus() {
      this.$refs.close.focus();
    }
  }
}
</script>

<style lang="scss">

@keyframes skewed {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.9);
  }
  75% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

$formPadding: 1.4375rem;

form {
  border: 1px solid #999;
  border-radius: 5px;
  font-family: $mono;
  button,
  input,
  select,
  textarea {
    font-family: inherit;
  }
  input,
  select,
  textarea {
    font-size: 1em;
    border: 1px solid #999;
    border-radius: 2px;
    @include media($mobile) {
      font-size: 0.875em;
    }
  }
  input,
  select {
    padding: 0.375em 0.5em;
  }
  textarea {
    padding: 0.5em;
  }
  button {
    font-size: 1em;
    &[type='submit'] {
      padding: 0.375em 1.5em;
      background: $tomato;
      color: $white;
      border: 2px solid $black;
      border-radius: 3px;
      &:hover,
      &:focus {
        background: darken($tomato, 10%);
      }
      &[disabled='disabled'] {
        cursor: not-allowed;
        animation: skewed 0.75s infinite linear;
      }
    }
  }
  .topbar {
    background: dodgerblue;
    color: $white;
    display: flex;
    justify-content: space-between;
    padding: 0.5em 0.5em 0.4375em $formPadding;
  }
  .title {
    font-weight: 600;
    position: relative;
    top: 0.15em;
  }
  .form-inner {
    padding: $formPadding;
    font-size: 0.875em;
  }
  .close {
    background: $tomato;
    border: 2px solid $black;
    width: 1.5em;
    height: 1.5em;
    &:hover,
    &:focus {
      background: darken($tomato, 10%);
    }
    div {
      background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDwhLS0gQ3JlYXRlZCB3aXRoIE1ldGhvZCBEcmF3IC0gaHR0cDovL2dpdGh1Yi5jb20vZHVvcGl4ZWwvTWV0aG9kLURyYXcvIC0tPgogPGc+CiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPgogIDxyZWN0IGZpbGw9Im5vbmUiIGlkPSJjYW52YXNfYmFja2dyb3VuZCIgaGVpZ2h0PSI0MDIiIHdpZHRoPSI0MDIiIHk9Ii0xIiB4PSItMSIvPgogPC9nPgogPGc+CiAgPHRpdGxlPkxheWVyIDE8L3RpdGxlPgogIDxyZWN0IGlkPSJzdmdfMSIgaGVpZ2h0PSI4MCIgd2lkdGg9IjgwIiB5PSIwIiB4PSIwIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZT0iIzAwMCIgZmlsbD0iI2ZmZmZmZiIvPgogIDxyZWN0IGlkPSJzdmdfMyIgaGVpZ2h0PSI4MCIgd2lkdGg9IjgwIiB5PSI4MCIgeD0iODAiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlPSIjMDAwIiBmaWxsPSIjZmZmZmZmIi8+CiAgPHJlY3QgaWQ9InN2Z180IiBoZWlnaHQ9IjgwIiB3aWR0aD0iODAiIHk9IjE2MCIgeD0iMTYwIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZT0iIzAwMCIgZmlsbD0iI2ZmZmZmZiIvPgogIDxyZWN0IGlkPSJzdmdfNSIgaGVpZ2h0PSI4MCIgd2lkdGg9IjgwIiB5PSIyNDAiIHg9IjI0MCIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2U9IiMwMDAiIGZpbGw9IiNmZmZmZmYiLz4KICA8cmVjdCBpZD0ic3ZnXzYiIGhlaWdodD0iODAiIHdpZHRoPSI4MCIgeT0iMzIwIiB4PSIzMjAiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlPSIjMDAwIiBmaWxsPSIjZmZmZmZmIi8+CiAgPHJlY3QgaWQ9InN2Z183IiBoZWlnaHQ9IjgwIiB3aWR0aD0iODAiIHk9IjAiIHg9IjMyMCIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2U9IiMwMDAiIGZpbGw9IiNmZmZmZmYiLz4KICA8cmVjdCBpZD0ic3ZnXzgiIGhlaWdodD0iODAiIHdpZHRoPSI4MCIgeT0iODAiIHg9IjI0MCIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2U9IiMwMDAiIGZpbGw9IiNmZmZmZmYiLz4KICA8cmVjdCBpZD0ic3ZnXzkiIGhlaWdodD0iODAiIHdpZHRoPSI4MCIgeT0iMjQwIiB4PSI4MCIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2U9IiMwMDAiIGZpbGw9IiNmZmZmZmYiLz4KICA8cmVjdCBpZD0ic3ZnXzEwIiBoZWlnaHQ9IjgwIiB3aWR0aD0iODAiIHk9IjMyMCIgeD0iMCIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2U9IiMwMDAiIGZpbGw9IiNmZmZmZmYiLz4KIDwvZz4KPC9zdmc+');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 0.75em;
      height: 0.75em;
      margin: 0 auto;
    }
  }
  label {
    margin: 1em 0 0.375em;
    &:first-child {
      margin-top: 0;
    }
  }
  input {
    + small.error {
      margin-top: 0.3125em;
    }
  }
  textarea {
    + small.error {
      margin-top: 0.15em;
    }
  }
  .message {
    padding: 1em $formPadding;
    &.success {
      text-align: center;
    }
    &.error {
      padding-bottom: 0;
      color: $error;
    }
  }
}

.modal {
  width: 100%;
  @media only screen and (max-width: 1023px) {
    padding: 0 1em;
  }
  @media only screen and (max-width: 479px) {
    padding: 0 0.5em;
  }
  &.popup {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 34em;
    max-height: 100vh;
    transform-origin: 0% 0%;
    z-index: 1;
    @include media($mobile) {
      transform-origin: 50% 50%;
    }
    form {
      background: $white;
      box-shadow: 1px 2px 4px 1px rgba(#333, 0.2);
    }
    @media only screen and (max-width: 479px) {
      position: absolute;
      left: 0;
      top: 0.5em;
      transform: none;
    }
  }
}

.bounce-enter-active {
  animation: bounce-in 0.375s;
  @include media($mobile) {
    animation: bounce-in-mobile 0.375s;
  }
}
.bounce-leave-active {
  animation: bounce-out 0.375s;
  @include media($mobile) {
    animation: bounce-out-mobile 0.375s;
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0.85) translate(-50%, -50%);
    opacity: 0;
  }
  50% {
    transform: scale(1.125) translate(-50%, -50%);
  }
  100% {
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1) translate(-50%, -50%);
    opacity: 1;
  }
  100% {
    transform: scale(0.5) translate(-50%, -50%);
    opacity: 0;
  }
}

@keyframes bounce-in-mobile {
  0% {
    transform: scale(0.85);
    opacity: 0;
  }
  50% {
    transform: scale(1.125);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce-out-mobile {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.5);
    opacity: 0;
  }
}
</style>
