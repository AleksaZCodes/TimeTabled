<template>
  <div class="card flex flex-col gap-1 overflow-x-auto bg-base-200 p-4 shadow">
    <div class="flex justify-between">
      <h2 class="card-title">People</h2>

      <button class="btn btn-square btn-ghost btn-sm">
        <FontAwesome class="text-lg text-primary" icon="plus" />
      </button>
    </div>

    <div class="divider my-0"></div>

    <div class="flex h-80 w-full flex-col gap-2 overflow-y-auto md:h-96">
      <div
        class="card flex flex-row items-center justify-between bg-base-100 px-4 py-2 shadow"
        v-for="i in 16"
        :key="'user' + i"
      >
        <div class="flex items-center gap-2 overflow-auto">
          <div class="avatar">
            <div class="w-11 rounded-full">
              <img src="https://placehold.co/400" />
            </div>
          </div>
          <div class="flex flex-col gap-2 overflow-x-auto">
            <h3 class="truncate font-bold">John Doe {{ i }}</h3>
            <div class="flex gap-2 overflow-x-scroll">
              <div class="badge badge-neutral badge-sm font-bold">Member</div>
              <div class="badge badge-neutral badge-sm font-bold">Hardware</div>
              <div class="badge badge-neutral badge-sm font-bold">Software</div>
              <div
                class="badge badge-neutral badge-sm whitespace-nowrap font-bold"
              >
                Ur mom
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-square btn-ghost btn-sm">
          <FontAwesome class="text-lg text-primary" icon="id-badge" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>
