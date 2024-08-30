<template>
  <div class="card flex flex-col gap-1 overflow-x-auto bg-base-200 p-4 shadow">
    <div class="flex justify-between">
      <h2 class="card-title">Projects</h2>

      <ProjectsModal />
    </div>

    <div class="divider my-0"></div>

    <div class="flex flex-col items-center gap-1 md:flex-row md:gap-0">
      <div class="flex h-44 w-full flex-col gap-2 overflow-y-auto md:h-60">
        <div
          class="card flex flex-row items-center justify-between bg-base-100 px-4 py-2 shadow"
          v-for="project in projectsStore.projects"
          v-if="
            projectsStore.projects.length &&
            projectsStore.currentTeamId &&
            !loading
          "
          :key="'project' + project.id"
        >
          <div class="overflow-x-auto">
            <h3 class="truncate font-bold">
              {{ project.title }}
            </h3>
            <p class="truncate text-sm opacity-80">
              {{ project.description }}
            </p>
          </div>
          <RouterLink
            class="btn btn-square btn-ghost btn-sm"
            :to="`/projects/${project.id}`"
          >
            <FontAwesome
              class="text-lg text-primary"
              icon="arrow-up-right-from-square"
            />
          </RouterLink>
        </div>

        <LoadingSection v-if="loading" width="" height="h-full" />
      </div>

      <div class="divider m-0 md:divider-horizontal"></div>

      <div
        class="aspect-square min-h-[200px] w-44 md:h-full md:w-auto md:max-w-56"
      >
        <EisenhowerMatrix
          class="min-h-[200px]"
          id="eisenhower-projects"
          :store="projectsStore"
          :items="projectsStore.projects"
          items-name="projects"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const loading = ref(true)

const projectsStore = useProjectsStore()
const teamsStore = useTeamsStore()

onMounted(async () => {
  if (teamsStore.currentTeamId) {
    projectsStore.currentTeamId = teamsStore.currentTeamId
    await projectsStore.fetchProjects()
  }

  setTimeout(() => {
    loading.value = false
  }, 100)
})

watch(
  () => teamsStore.currentTeamId,
  async () => {
    loading.value = true

    if (teamsStore.currentTeamId) {
      projectsStore.currentTeamId = teamsStore.currentTeamId
      await projectsStore.fetchProjects()
    }

    setTimeout(() => {
      loading.value = false
    }, 100)
  }
)
</script>
