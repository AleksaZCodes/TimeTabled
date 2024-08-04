<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <UserBar />

    <TeamsCard />

    <PublicProjectsCard />
  </div>
</template>

<script setup>
useHead({
  title: 'User Profile | LeanLaunch',
  meta: [{ name: 'description', content: 'LeanLaunch User Profile' }]
})

definePageMeta({
  layout: 'default'
})
</script>
