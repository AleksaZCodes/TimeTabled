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
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const checkForNewUser = async () => {
  const id = user.value.id

  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('id', id)
    .limit(1)

  if (error && error.code !== 'PGRST116') {
    alert(error.message)
    loading.value = false
    return
  }

  if (!data[0]) {
    await supabase
      .from('users')
      .insert({ id, github_user_id: user.value.user_metadata.provider_id })

    await createPersonalTeam()
  }

  loading.value = false
}

const createPersonalTeam = async () => {
  const { data: chatData, error: chatError } = await supabase
    .from('chats')
    .insert({})
    .select('id')
    .single()

  if (chatError) {
    alert(chatError.message)
    return
  }

  const chatId = chatData.id

  const { data: teamData, error: teamError } = await supabase
    .from('teams')
    .insert({
      name: `${user.value.user_metadata.full_name}'s Team`,
      public: false,
      chat_id: chatId
    })
    .select('id')
    .single()

  if (teamError) {
    alert(teamError.message)
    return
  }

  const teamId = teamData.id

  const { data: userTeamData, error: userTeamError } = await supabase
    .from('users_teams')
    .insert({
      user_id: user.value.id,
      team_id: teamId
    })

  if (userTeamError) {
    alert(userTeamError.message)
    return
  }

  const { data: teamUserRoleData, error: teamUserRoleError } = await supabase
    .from('teams_users_roles')
    .insert({
      team_id: teamId,
      user_id: user.value.id,
      role_id: 1
    })

  if (teamUserRoleError) {
    alert(teamUserRoleError.message)
  }
}

checkForNewUser()
</script>
