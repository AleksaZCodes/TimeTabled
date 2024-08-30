<template>
  <LoadingSection v-if="loading" />

  <div class="grid grid-cols-1 gap-4 md:grid-cols-5" v-else>
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

const loading = ref(true)
const userStore = useUserStore()
const teamsStore = useTeamsStore()

const checkForNewUser = async () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const session = useSupabaseSession()

  const id = user.value.id

  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('id', id)
    .limit(1)

  if (error) {
    alert(error.message)
    loading.value = false
    return
  }

  if (!data[0]) {
    await supabase
      .from('users')
      .insert({ id, github_user_id: user.value.user_metadata.provider_id })

    await teamsStore.createTeam({
      name: `${user.value.user_metadata.full_name}'s Team`
    })
  }

  userStore.userMetadata = user.value.user_metadata

  teamsStore.fetchTeams()

  userStore.newUser = false
  userStore.github_access_token = session.value.provider_token
  loading.value = false
}

if (userStore.newUser) {
  checkForNewUser()
} else {
  loading.value = false
}
</script>
