<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-5">
    <IdeasCard class="md:col-span-3" />

    <TasksCard class="md:col-span-2" />

    <TeamChatCard class="md:col-span-2" />

    <ProjectsCard class="md:col-span-3" />
  </div>
</template>

<script setup>
useHead({
  title: 'Dashboard | LeanLaunch',
  meta: [{ name: 'description', content: 'LeanLaunch Dashboard' }]
})

definePageMeta({
  layout: 'dashboard'
})
</script>
