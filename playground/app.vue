<script setup>
import { useNuxtApp } from '#imports'

const { $intercom } = useNuxtApp()
function updateIntercomUserData() {
  $intercom.update({
    name: 'hans',
    customer_handler: '123',
  })
}
</script>

<template>
  <div>
    Nuxt module playground!
  </div>
  <button @click="updateIntercomUserData">
    Update user data
  </button>
</template>
