<template>
  <div class="card flex flex-col gap-1 overflow-x-auto bg-base-200 p-4 shadow">
    <div class="flex items-center justify-between">
      <h2 class="card-title">Teams</h2>
    </div>

    <div class="divider my-0"></div>

    <div
      class="grid h-80 w-full grid-cols-1 gap-2 overflow-y-auto md:h-96 md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        class="card justify-between gap-2 bg-base-100 px-4 py-2 shadow md:px-6 md:py-4"
        v-for="i in 12"
        :key="'board' + i"
      >
        <h3 class="truncate font-bold">Team {{ i }}</h3>
        <div class="flex gap-2 overflow-x-scroll">
          <div class="badge badge-neutral badge-sm font-bold">Member</div>
          <div class="badge badge-neutral badge-sm font-bold">Hardware</div>
          <div class="badge badge-neutral badge-sm font-bold">Software</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
