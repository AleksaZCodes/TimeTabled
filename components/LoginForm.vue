<template>
  <div class="card bg-base-200">
    <div class="card-body items-center gap-6">
      <Logo size="xl" />

      <div class="card-actions w-full gap-3">
        <!-- <ButtonIcon
            @click="fillInInfo"
            :icon="['fab', 'google']"
            :disabled="loading"
            >Login with Google</ButtonIcon
          > -->

        <ButtonIcon
          @click="loginWithGitHub"
          :icon="['fab', 'github']"
          :disabled="loading"
          >Login with GitHub</ButtonIcon
        >

        <!-- <ButtonIcon
            @click="loginWithX"
            :icon="['fab', 'x-twitter']"
            :disabled="loading"
            >Login with X</ButtonIcon
          > -->

        <!-- <div class="divider w-full">or</div>

          <form
            class="w-full gap-5 flex flex-col"
            @submit.prevent="loginWithEmail"
          >
            <div class="flex flex-col gap-3">
              <input
                class="input input-bordered w-full"
                v-model="email"
                :disabled="loading"
                required
                type="email"
                placeholder="Email"
              />
              <input
                class="input input-bordered w-full"
                v-model="password"
                :disabled="loading"
                required
                type="password"
                placeholder="Password"
              />
            </div>
            <ButtonIcon :disabled="loading" icon="envelope" type="submit">
              Login with Email
            </ButtonIcon>
          </form> -->
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(false)

const loginWithGitHub = async () => {
  loading.value = true

  const { error } = await useSupabaseClient().auth.signInWithOAuth({
    provider: 'github',
    options: {
      scopes: 'repo read:user'
    }
  })

  if (error) {
    loading.value = false
    alert(error)
    return
  }

  await useRouter().push('/dashboard')
}
</script>
