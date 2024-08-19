<template>
  <div>
    <button class="btn btn-sm" onclick="accountModal.showModal()">
      <FontAwesome icon="user" /> Account
    </button>

    <dialog class="modal" id="accountModal">
      <div class="modal-box flex flex-col gap-6">
        <form class="absolute right-2 top-2" method="dialog">
          <button class="btn btn-circle btn-ghost btn-sm">
            <FontAwesome icon="xmark" />
          </button>
        </form>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="avatar">
              <div class="w-16 rounded-full">
                <img :src="userStore.userMetadata?.avatar_url" />
              </div>
            </div>

            <div>
              <h3 class="text-xl font-bold">
                {{ userStore.userMetadata?.full_name }}
              </h3>

              <p class="opacity-80">{{ userStore.userMetadata?.user_name }}</p>
            </div>
          </div>

          <a
            class="btn btn-circle btn-ghost"
            :href="`https://github.com/${userStore.userMetadata?.user_name}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesome class="text-2xl" :icon="['fab', 'github']" />
          </a>
        </div>

        <button class="btn" @click="logOut" :disabled="loading">Log out</button>
      </div>
    </dialog>
  </div>
</template>

<script setup>
const loading = ref(false)
const userStore = useUserStore()

const logOut = async () => {
  loading.value = true

  const supabase = useSupabaseClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    alert(error)
    return
  }

  userStore.newUser = true
  await useRouter().push('/login')
}
</script>
