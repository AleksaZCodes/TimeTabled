<template>
  <LoginForm />
</template>

<script setup>
useHead({
  title: 'Login | LeanLaunch',
  meta: [{ name: 'description', content: 'Login to LeanLaunch' }]
})

definePageMeta({
  layout: 'authentication'
})
</script>
