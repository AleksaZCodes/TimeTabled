<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <TeamBar />

    <PeopleCard />

    <PublicProjectsCard />
  </div>
</template>

<script setup>
useHead({
  title: 'Team Overview | LeanLaunch',
  meta: [{ name: 'description', content: 'LeanLaunch Team Overview' }]
})

definePageMeta({
  layout: 'default'
})
</script>
