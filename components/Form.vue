<template>
  <transition name="bounce">
    <div v-show="form.isOpen" class="modal popup">
      <form method="POST" id="contact-form" @submit.prevent="handleSubmit" novalidate>
        <div class="topbar">
          <div class="title">Contact Me</div>
          <button ref="closeButton" class="close" type="button" @click.prevent="close"><div></div></button>
        </div>
        <div v-if="message" :class="['message', (errors !== null || errorBool ? 'error' : 'success')]" v-html="message" />
        <div v-if="!complete" class="form-inner">
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            :aria-invalid="errors && errors.name ? true : false"
            :aria-errormessage="errors && errors.name ? 'errorName' : null"
            required
          >
          <small v-if="errors && errors.name" id="errorName" class="error">
            {{ errors.name }}
          </small>
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            :aria-invalid="errors && errors.email ? true : false"
            :aria-errormessage="errors && errors.email ? 'errorEmail' : null"
            required
          >
          <small v-if="errors && errors.email" id="errorEmail" class="error">
            {{ errors.email }}
          </small>
          <label for="message">Message</label>
          <textarea
            name="message"
            id="message"
            :aria-invalid="errors && errors.message ? true : false"
            :aria-errormessage="errors && errors.message ? 'errorMessage' : null"
            required
          />
          <small v-if="errors && errors.message" id="errorMessage" class="error">
            {{ errors.message }}
          </small>
          <input type="hidden" name="form-name" value="contact-form">
          <button type="submit" :disabled="loading">Send</button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script setup>
import axios from 'axios'
const form = useForm()

let errors = {}
let errorBool = false
const message = ref(null)
const complete = ref(false)
const loading = ref(false)

const closeButton = ref(null)

const close = () => {
  form.close()
  setTimeout(() => {
    form.increment()
  }, 500)
}

const handleSubmit = async (e) => {
  loading.value = true

  const formData = new FormData(e.currentTarget)

  const rules = {
    name: ['required'],
    email: ['required', 'email'],
    message: ['required']
  }

  errors = useValidation(formData, rules)

  if (errors === null) {
    try {
      const response = await axios.post('/', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      errorBool = false
      message.value = 'Thanks! I’ll try to get back to you as soon as possible.'
      complete.value = true
    } catch (e) {
      errorBool = true
      message.value = 'Hmm, there was an error with your submission. Please check your submission below and try again.'
    }
  } else {
      message.value = 'Hmm, there was an error with your submission. Please check your submission below and try again.'
  }

  loading.value = false
}

</script>
