<template>
  <div
    class="card flex flex-col gap-1 overflow-x-auto bg-base-200 p-4 shadow md:col-span-2"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="avatar">
          <div class="w-14 rounded-full">
            <img src="https://placehold.co/400" />
          </div>
        </div>

        <div>
          <h3 class="text-xl font-bold">Aleksa Zdravkovic</h3>

          <p class="opacity-80">AleksaZCodes</p>
        </div>
      </div>

      <div class="flex items-center">
        <a
          class="btn btn-circle btn-ghost"
          :href="`https://github.com/${userMetadata?.user_name}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesome class="text-2xl" :icon="['fab', 'github']" />
        </a>

        <button class="btn btn-square btn-ghost btn-sm">
          <FontAwesome class="text-lg text-primary" icon="people-group" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>
