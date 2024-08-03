<template>
  <div class="card gap-1 overflow-x-auto bg-base-200 p-4 shadow">
    <div class="flex justify-between">
      <h2 class="card-title">Today's tasks</h2>

      <button class="btn btn-square btn-ghost btn-sm">
        <FontAwesome
          class="text-lg text-primary"
          icon="arrow-up-right-from-square"
        />
      </button>
    </div>

    <div class="divider my-0"></div>

    <div class="flex h-44 w-full flex-col gap-2 overflow-y-auto md:h-60">
      <div
        class="card flex flex-row items-center justify-between bg-base-100 px-4 py-2 shadow"
        v-for="i in 16"
        :key="'task' + i"
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
</template>

<script setup></script>
