<template>
  <LoadingSection v-if="loading" />
  <Hero v-else />
</template>

<script setup>
const loading = ref(true)

useHead({
  title: 'Stop Overengineering, Start Launching | LeanLaunch',
  meta: [
    {
      name: 'description',
      content:
        'The planning tool to transform your ideas into validated ready-to-launch MVPs and products using AI and lean principles.'
    }
  ]
})

const router = useRouter()

// Check if the code parameter is present in the URL
onMounted(() => {
  const code = router.currentRoute.value.query.code
  if (code) {
    // Redirect to dashboard
    router.push('/dashboard')
  }
  loading.value = false
})
</script>
