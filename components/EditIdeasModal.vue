<template>
  <div>
    <button
      class="btn btn-square btn-ghost btn-sm"
      :onclick="`editIdea${idea.id}Modal.showModal()`"
    >
      <FontAwesome class="text-lg text-primary" icon="pen-to-square" />
    </button>

    <dialog :class="['modal']" :id="`editIdea${idea.id}Modal`" ref="dialog">
      <div class="modal-box flex flex-col gap-5">
        <form class="absolute right-2 top-2" method="dialog">
          <button class="btn btn-circle btn-ghost btn-sm">
            <FontAwesome icon="xmark" />
          </button>
        </form>

        <h3 class="text-xl font-bold">Edit idea</h3>

        <form class="flex w-full flex-col gap-6" @submit.prevent="editIdea">
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
            :disabled="
              loading ||
              (title === idea.title && description === idea.description)
            "
            type="submit"
          >
            Save
          </button>
        </form>

        <div class="collapse collapse-arrow">
          <input type="checkbox" />

          <h3 class="collapse-title px-0 text-xl font-bold">
            Convert to project
          </h3>

          <div class="collapse-content flex flex-col gap-5 p-0">
            <p>Make this idea into a project to start working on it.</p>

            <button
              class="btn btn-primary btn-block"
              :disabled="loading"
              @click="convertIdea"
            >
              Convert
            </button>
          </div>
        </div>

        <div class="collapse collapse-arrow m-0">
          <input type="checkbox" />

          <h3 class="collapse-title h-fit px-0 text-xl font-bold">
            Delete idea
          </h3>

          <div class="collapse-content flex flex-col gap-5 p-0">
            <p>Are you sure you want to delete this idea?</p>

            <button
              class="btn btn-block"
              :disabled="loading"
              @click="deleteIdea"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
const props = defineProps({
  idea: Object
})

const ideasStore = useIdeasStore()

const title = ref(props.idea.title)
const description = ref(props.idea.description)
const loading = ref(false)
const dialog = ref(null)

const editIdea = async () => {
  loading.value = true

  console.log({
    ideaId: props.idea.id,
    title: title.value,
    description: description.value
  })

  await ideasStore.updateIdea(props.idea.id, title.value, description.value)

  dialog.value.close()
  setTimeout(() => {
    loading.value = false
  })
}

const convertIdea = async () => {
  loading.value = true

  // await ideasStore.convertIdea(props.idea.id)

  dialog.value.close()
  setTimeout(() => {
    loading.value = false
  })
}

const deleteIdea = async () => {
  loading.value = true

  await ideasStore.deleteIdea(props.idea.id)
}
</script>
