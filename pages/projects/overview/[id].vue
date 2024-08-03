<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-5">
    <ProjectDescriptionCard class="col-span-3" />
    <FeedbackCard class="col-span-2" />
  </div>
</template>

<script setup>
useHead({
  title: 'Project Overview | LeanLaunch',
  meta: [{ name: 'description', content: 'LeanLaunch Project Overview' }]
})

definePageMeta({
  layout: 'default'
})
</script>
