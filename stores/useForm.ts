import { defineStore } from 'pinia'

export const useForm = defineStore('form', () => {
  const openState = ref(false)
  const count = ref(0)

  function toggle () { openState.value = !openState.value }
  function open () { openState.value = true }
  function close () { openState.value = false }
  function increment () { count.value++ }

  return {
    isOpen: computed(() => openState.value),
    count: computed(() => count.value),
    toggle,
    open,
    close,
    increment
  }
})
