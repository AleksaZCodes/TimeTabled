<template>
  <div>
    <button class="btn btn-sm" onclick="accountModal.showModal()">
      <FontAwesome icon="user" /> Account and team
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
                <img :src="userMetadata?.avatar_url" />
              </div>
            </div>

            <div>
              <h3 class="text-xl font-bold">{{ userMetadata?.full_name }}</h3>

              <p class="opacity-80">{{ userMetadata?.user_name }}</p>
            </div>
          </div>

          <a
            class="btn btn-circle btn-ghost"
            :href="`https://github.com/${userMetadata?.user_name}`"
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
const supabase = useSupabaseClient()

const userMetadata = ref(null)
const loading = ref(false)

// const getUserMetadata = async () => {
//   loading.value = true

//   const { data, error } = await supabase.auth.getUser()

//   if (error) {
//     alert(error)
//     return
//   }

//   userMetadata.value = data.user.user_metadata
//   loading.value = false
// }

// const logOut = async () => {
//   loading.value = true

//   const { error } = await useSupabaseClient().auth.signOut()

//   if (error) {
//     alert(error)
//   }

//   await useRouter().push('/login')
// }

// await getUserMetadata()
</script>
