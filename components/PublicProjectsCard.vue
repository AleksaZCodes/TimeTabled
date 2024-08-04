<template>
  <div class="card flex flex-col gap-1 overflow-x-auto bg-base-200 p-4 shadow">
    <div class="flex justify-between">
      <h2 class="card-title">Projects</h2>
    </div>

    <div class="divider my-0"></div>

    <div class="flex h-80 w-full flex-col gap-2 overflow-y-auto md:h-96">
      <div
        class="card flex flex-row items-center justify-between bg-base-100 px-4 py-2 shadow"
        v-for="i in 16"
        :key="'project' + i"
      >
        <div class="overflow-x-auto">
          <h3 class="truncate font-bold">My Project</h3>
          <p class="truncate text-sm opacity-80">Lorem ipsum dolor sit amet</p>
        </div>
        <button class="btn btn-square btn-ghost btn-sm">
          <FontAwesome
            class="text-lg text-primary"
            icon="arrow-up-right-from-square"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>
