<template>
  <LoadingSection v-if="loading" />
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2" v-else>
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

const route = useRoute()
const userStore = useUserStore()

const loading = ref(true)

onMounted(async () => {
  await userStore.fetchUserById(route.params.id)

  setTimeout(() => {
    loading.value = false
  }, 100)
})
</script>
