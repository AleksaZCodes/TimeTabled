<template>
  <div class="card flex flex-col gap-1 overflow-x-auto bg-base-200 p-4 shadow">
    <div class="flex justify-between">
      <h2 class="card-title">Ideas</h2>

      <IdeasModal />
    </div>

    <div class="divider my-0"></div>

    <div class="flex flex-col items-center gap-1 md:flex-row md:gap-0">
      <div class="flex h-44 w-full flex-col gap-2 overflow-y-auto md:h-60">
        <div
          class="card flex flex-row items-center justify-between bg-base-100 px-4 py-2 shadow"
          v-if="ideasStore.ideas.length && !loading"
          v-for="idea in ideasStore.ideas"
          :key="'idea' + idea.id"
        >
          <div class="overflow-x-auto">
            <h3 class="truncate font-bold">{{ idea.title }}</h3>
            <p class="truncate text-sm opacity-80">
              {{ idea.description }}
            </p>
          </div>
          <EditIdeasModal :idea="idea" :key="'edit-idea' + idea.id" />
        </div>

        <div
          class="card flex flex-row items-center justify-between bg-base-100 px-4 py-2 shadow"
          v-else-if="!loading"
        >
          <div class="overflow-x-auto">
            <h3 class="truncate font-bold">Add your first idea</h3>
            <p class="truncate text-sm opacity-80">
              It's time to start tinkering!
            </p>
          </div>
          <IdeasModal />
        </div>

        <LoadingSection v-else width="" height="h-full" />
      </div>

      <div class="divider m-0 md:divider-horizontal"></div>

      <div
        class="aspect-square min-h-[200px] w-44 md:h-full md:w-auto md:max-w-56"
      >
        <EisenhowerMatrix
          class="min-h-[200px]"
          id="eisenhower-ideas"
          :store="ideasStore"
          :items="ideasStore.ideas"
          items-name="ideas"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true)

const ideasStore = useIdeasStore()

onMounted(async () => {
  await ideasStore.fetchIdeas()

  setTimeout(() => {
    loading.value = false
  }, 100)
})
</script>
