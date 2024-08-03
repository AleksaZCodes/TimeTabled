<template>
  <div class="card flex flex-col gap-1 overflow-x-auto bg-base-200 p-4 shadow">
    <div class="flex justify-between">
      <h2 class="card-title">Ideas</h2>

      <button class="btn btn-square btn-ghost btn-sm">
        <FontAwesome class="text-lg text-primary" icon="plus" />
      </button>
    </div>

    <div class="divider my-0"></div>

    <div class="flex flex-col items-center gap-1 md:flex-row md:gap-0">
      <div class="flex h-44 w-full flex-col gap-2 overflow-y-auto md:h-60">
        <div
          class="card flex flex-row items-center justify-between bg-base-100 px-4 py-2 shadow"
          v-for="i in 16"
          :key="'idea' + i"
        >
          <div class="overflow-x-auto">
            <h3 class="truncate font-bold">My Idea</h3>
            <p class="truncate text-sm opacity-80">
              Lorem ipsum dolor sit amet
            </p>
          </div>
          <button class="btn btn-square btn-ghost btn-sm">
            <FontAwesome class="text-lg text-primary" icon="pen-to-square" />
          </button>
        </div>
      </div>

      <div class="divider m-0 md:divider-horizontal"></div>

      <div
        class="aspect-square min-h-[200px] w-44 md:h-full md:w-auto md:max-w-56"
      >
        <EisenhowerMatrix class="min-h-[200px]" id="eisenhower-ideas" />
      </div>
    </div>
  </div>
</template>

<script setup></script>
