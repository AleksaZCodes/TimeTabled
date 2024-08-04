<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
    <BoardBar class="md:col-span-4" />

    <div
      class="card flex h-full flex-col gap-1 overflow-x-auto bg-base-200 p-4 shadow"
    >
      <div class="flex justify-between">
        <h2 class="card-title">Backlog</h2>
      </div>

      <div class="divider my-0"></div>

      <div class="flex h-80 w-full flex-col gap-2 overflow-y-auto md:h-96">
        <div
          class="card flex flex-row items-center justify-between bg-base-100 px-4 py-2 shadow"
          v-for="i in 16"
          :key="'task-backlog' + i"
        >
          <div class="overflow-x-auto">
            <h3 class="truncate font-bold">My Task</h3>
            <p class="truncate text-sm opacity-80">Project: Lorem Ipsum</p>
          </div>
          <select class="select select-bordered select-sm max-w-xs">
            <option disabled>Status</option>
            <option selected>To Do</option>
            <option>Doing</option>
            <option>Done</option>
          </select>
        </div>
      </div>
    </div>

    <div
      class="card flex flex-col gap-1 overflow-x-auto bg-base-200 p-4 shadow"
    >
      <div class="flex justify-between">
        <h2 class="card-title">To Do</h2>
      </div>

      <div class="divider my-0"></div>

      <div class="flex h-80 w-full flex-col gap-2 overflow-y-auto md:h-96">
        <div
          class="card flex flex-row items-center justify-between bg-base-100 px-4 py-2 shadow"
          v-for="i in 16"
          :key="'task-todo' + i"
        >
          <div class="overflow-x-auto">
            <h3 class="truncate font-bold">My Task</h3>
            <p class="truncate text-sm opacity-80">Project: Lorem Ipsum</p>
          </div>
          <select class="select select-bordered select-sm max-w-xs">
            <option disabled>Status</option>
            <option selected>To Do</option>
            <option>Doing</option>
            <option>Done</option>
          </select>
        </div>
      </div>
    </div>

    <div
      class="card flex flex-col gap-1 overflow-x-auto bg-base-200 p-4 shadow"
    >
      <div class="flex justify-between">
        <h2 class="card-title">Doing</h2>
      </div>

      <div class="divider my-0"></div>

      <div class="flex h-80 w-full flex-col gap-2 overflow-y-auto md:h-96">
        <div
          class="card flex flex-row items-center justify-between bg-base-100 px-4 py-2 shadow"
          v-for="i in 16"
          :key="'task-doing' + i"
        >
          <div class="overflow-x-auto">
            <h3 class="truncate font-bold">My Task</h3>
            <p class="truncate text-sm opacity-80">Project: Lorem Ipsum</p>
          </div>
          <select class="select select-bordered select-sm max-w-xs">
            <option disabled>Status</option>
            <option selected>To Do</option>
            <option>Doing</option>
            <option>Done</option>
          </select>
        </div>
      </div>
    </div>

    <div
      class="card flex flex-col gap-1 overflow-x-auto bg-base-200 p-4 shadow"
    >
      <div class="flex justify-between">
        <h2 class="card-title">Done</h2>
      </div>

      <div class="divider my-0"></div>

      <div class="flex h-80 w-full flex-col gap-2 overflow-y-auto md:h-96">
        <div
          class="card flex flex-row items-center justify-between bg-base-100 px-4 py-2 shadow"
          v-for="i in 16"
          :key="'task-done' + i"
        >
          <div class="overflow-x-auto">
            <h3 class="truncate font-bold">My Task</h3>
            <p class="truncate text-sm opacity-80">Project: Lorem Ipsum</p>
          </div>
          <select class="select select-bordered select-sm max-w-xs">
            <option disabled>Status</option>
            <option selected>To Do</option>
            <option>Doing</option>
            <option>Done</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
})
</script>
