<template>
  <div>
    <button
      class="btn btn-square btn-ghost btn-sm"
      onclick="projectsModal.showModal()"
    >
      <FontAwesome class="text-lg text-primary" icon="plus" />
    </button>

    <dialog class="modal" id="projectsModal" ref="dialog">
      <div class="modal-box flex flex-col gap-5">
        <form class="absolute right-2 top-2" method="dialog">
          <button class="btn btn-circle btn-ghost btn-sm">
            <FontAwesome icon="xmark" />
          </button>
        </form>

        <h3 class="text-xl font-bold">Convert an idea to project</h3>

        <form class="flex w-full flex-col gap-6" @submit.prevent="addProject">
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
              <label for="public">Pick an idea</label>
              <select
                class="select select-bordered"
                v-model="idea_id"
                :disabled="loading"
              >
                <option
                  v-for="idea in ideasStore.ideas"
                  :key="idea.id"
                  :value="idea.id"
                >
                  {{ idea.title }}
                </option>
              </select>
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
            Convert
          </button>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script setup>
const ideasStore = useIdeasStore()
const projectsStore = useProjectsStore()

const pub = ref(false)
const idea_id = ref('')
const loading = ref(false)
const dialog = ref(null)

const addProject = async () => {
  loading.value = true
  await projectsStore.addProject(idea_id.value, pub.value)

  dialog.value.close()
  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>
