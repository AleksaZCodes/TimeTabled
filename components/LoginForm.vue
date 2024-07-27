<template>
  <div class="w-full flex flex-col gap-4">
    <div class="card bg-base-200">
      <div class="card-body items-center gap-6">
        <Logo size="xl" />

        <div class="card-actions w-full gap-3">
          <ButtonIcon
            @click="fillInInfo"
            :icon="['fab', 'google']"
            :disabled="loading"
            >Login with Google</ButtonIcon
          >

          <ButtonIcon
            @click="loginWithGitHub"
            :icon="['fab', 'github']"
            :disabled="loading"
            >Login with GitHub</ButtonIcon
          >

          <ButtonIcon
            @click="loginWithX"
            :icon="['fab', 'x-twitter']"
            :disabled="loading"
            >Login with X</ButtonIcon
          >

          <div class="divider w-full">or</div>

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
          </form>
        </div>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body flex-row justify-between">
        <span class="opacity-80">New to LeanLaunch?</span>

        <NuxtLink class="button-ghost" to="/signup"
          >Sign up
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

const loginWithEmail = async () => {
  loading.value = true

  const { data, error } = await useSupabaseClient().auth.signInWithPassword({
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

const fillInInfo = () => {
  email.value = 'aleksazdravkovic@proton.me'
  password.value = '12345678'
}

const loginWithGoogle = async () => {
  loading.value = true

  const { error } = await useSupabaseClient().auth.signInWithOAuth({
    provider: 'google'
  })

  if (error) {
    loading.value = false
    alert(error)
    return
  }

  await useRouter().push('/dashboard')
}

const loginWithGitHub = async () => {
  loading.value = true

  const { error } = await useSupabaseClient().auth.signInWithOAuth({
    provider: 'github'
  })

  if (error) {
    loading.value = false
    alert(error)
    return
  }

  await useRouter().push('/dashboard')
}

const loginWithX = async () => {
  loading.value = true

  const { error } = await useSupabaseClient().auth.signInWithOAuth({
    provider: 'twitter'
  })

  if (error) {
    loading.value = false
    alert(error)
    return
  }

  await useRouter().push('/dashboard')
}
</script>
