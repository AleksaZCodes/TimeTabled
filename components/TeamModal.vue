<template>
  <div>
    <button class="btn btn-sm" onclick="teamModal.showModal()">
      <FontAwesome icon="people-group" /> Team
    </button>

    <dialog class="modal" id="teamModal" ref="dialog">
      <div class="modal-box flex flex-col gap-4">
        <form class="absolute right-2 top-2" method="dialog">
          <button class="btn btn-circle btn-ghost btn-sm">
            <FontAwesome icon="xmark" />
          </button>
        </form>

        <div class="flex flex-col gap-5">
          <h3 class="text-xl font-bold">Select a team</h3>

          <div class="flex gap-2">
            <select
              class="select select-bordered w-full"
              v-model="teamsStore.currentTeamId"
            >
              <option
                v-for="team in teamsStore.teams"
                :key="team.id"
                :value="team.id"
              >
                {{ team.name }}
              </option>
            </select>

            <RouterLink
              class="btn btn-square btn-ghost"
              :to="`/teams/${teamsStore.currentTeamId}`"
              onclick="teamModal.close()"
            >
              <FontAwesome
                class="text-lg text-primary"
                icon="arrow-up-right-from-square"
              />
            </RouterLink>
          </div>
        </div>

        <div class="collapse collapse-arrow">
          <input type="checkbox" />

          <h3 class="collapse-title h-fit px-0 text-xl font-bold">
            Make a new team
          </h3>

          <LoadingSection class="collapse-content" v-if="loading" />

          <form
            class="collapse-content flex w-full flex-col gap-6 p-0"
            v-else
            @submit.prevent="makeTeam"
          >
            <div class="flex flex-col gap-3">
              <div class="flex flex-col gap-2">
                <label for="name">What do you want to call it?</label>
                <input
                  class="input input-bordered w-full"
                  v-model="name"
                  :disabled="loading"
                  required
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label for="public">Do you want it to be public?</label>
                <input
                  class="toggle toggle-lg"
                  v-model="pub"
                  type="checkbox"
                  :disabled="loading"
                />
              </div>
            </div>

            <button
              class="btn btn-primary btn-block"
              :disabled="loading"
              type="submit"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
const loading = ref(false)
const dialog = ref(null)
const name = ref('')
const pub = ref(false)

const router = useRouter()
const teamsStore = useTeamsStore()

const makeTeam = async () => {
  loading.value = true

  await teamsStore.createTeam({
    name: name.value,
    public: pub.value
  })

  await router.push('/teams/' + teamsStore.currentTeamId)

  dialog.value.close()
  name.value = ''
  pub.value = false
  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>
