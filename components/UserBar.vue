<template>
  <div
    class="card flex flex-col gap-1 overflow-x-auto bg-base-200 p-4 shadow md:col-span-2"
  >
    <LoadingSection v-if="loading" width="full" height="h-14" aspectRatio="" />
    <div class="flex items-center justify-between" v-else>
      <div class="flex items-center gap-4">
        <div class="avatar">
          <div class="w-14 rounded-full">
            <img
              :src="userMetadata?.avatar_url || 'https://placehold.co/400'"
            />
          </div>
        </div>

        <div>
          <h3 class="text-xl font-bold">
            {{ userMetadata?.name || 'Full Name' }}
          </h3>
          <p class="opacity-80">{{ userMetadata?.login || 'Username' }}</p>
        </div>
      </div>

      <div class="flex items-center">
        <a
          class="btn btn-circle btn-ghost"
          :href="`https://github.com/${userMetadata?.login}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesome class="text-2xl" :icon="['fab', 'github']" />
        </a>

        <button class="btn btn-square btn-ghost btn-sm">
          <FontAwesome class="text-lg text-primary" icon="people-group" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Octokit } from '@octokit/rest'

const userMetadata = ref(null)
const userStore = useUserStore()
const loading = ref(true)

const fetchGithubUserById = async id => {
  const octokit = new Octokit()

  try {
    const { data } = await octokit.request('GET /user/:id', { id })
    return data
  } catch (error) {
    console.error(`Error fetching user data: ${error}`)
    return null
  }
}

onMounted(async () => {
  userMetadata.value = await fetchGithubUserById(
    userStore.requestedUser.github_user_id
  )

  setTimeout(() => {
    loading.value = false
  }, 100)
})
</script>
