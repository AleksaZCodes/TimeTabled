<template>
  <div>
    <button
      class="btn btn-square btn-ghost btn-sm"
      onclick="ideasModal.showModal()"
    >
      <FontAwesome class="text-lg text-primary" icon="plus" />
    </button>

    <dialog class="modal" id="ideasModal" ref="dialog">
      <div class="modal-box flex flex-col gap-5">
        <form class="absolute right-2 top-2" method="dialog">
          <button class="btn btn-circle btn-ghost btn-sm">
            <FontAwesome icon="xmark" />
          </button>
        </form>

        <h3 class="text-xl font-bold">Add a new idea</h3>

        <form class="flex w-full flex-col gap-6" @submit.prevent="addIdea">
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
              <label for="title">What's your idea?</label>
              <input
                class="input input-bordered w-full"
                v-model="title"
                :disabled="loading"
                required
                type="text"
                placeholder="Title"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label for="title">Can you explain it in a few words?</label>
              <input
                class="input input-bordered w-full"
                v-model="description"
                :disabled="loading"
                required
                type="text"
                placeholder="Short description"
              />
            </div>
          </div>

          <button
            class="btn btn-primary btn-block"
            :disabled="loading || !title || !description"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script setup>
const ideasStore = useIdeasStore()

const title = ref('')
const description = ref('')
const loading = ref(false)
const dialog = ref(null)

const addIdea = async () => {
  loading.value = true
  await ideasStore.addIdea({
    title: title.value,
    description: description.value
  })

  title.value = ''
  description.value = ''
  dialog.value.close()

  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>
