<template>
  <div class="w-full flex flex-col gap-4">
    <div class="card bg-base-200">
      <div class="card-body items-center gap-6">
        <Logo size="xl" />

        <div class="card-actions w-full gap-3">
          <ButtonIcon :icon="['fab', 'google']" :disabled="loading"
            >Login with Google</ButtonIcon
          >

          <ButtonIcon :icon="['fab', 'github']" :disabled="loading"
            >Login with GitHub</ButtonIcon
          >

          <ButtonIcon :icon="['fab', 'x-twitter']" :disabled="loading"
            >Login with X</ButtonIcon
          >

          <div class="divider w-full">or</div>

          <form
            class="w-full gap-5 flex flex-col"
            @submit.prevent="signupWithEmail"
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
            <ButtonIcon icon="envelope" type="submit" :disabled="loading">
              Sign up with Email
            </ButtonIcon>
          </form>
        </div>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body flex-row justify-between">
        <span class="opacity-80">Already have an account?</span>

        <NuxtLink class="button-ghost" to="/login"
          >Login
          <FontAwesome icon="arrow-right" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const email = ref('')
const password = ref('')
const loading = ref(false)

const signupWithEmail = async () => {
  loading.value = true

  const { data, error } = await useSupabaseClient().auth.signUp({
    email: email.value,
    password: password.value
  })

  if (error) {
    loading.value = false
    alert(error)
    return
  }

  await useRouter().push('/dashboard')
}
</script>
