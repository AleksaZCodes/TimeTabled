<template>
  <div class="card gap-1 overflow-x-auto bg-base-200 p-4 shadow">
    <div class="flex justify-between">
      <h2 class="card-title">Team chat</h2>

      <ChatModal />
    </div>

    <div class="divider my-0"></div>
    <div
      class="flex h-44 flex-col justify-between gap-1 overflow-y-auto md:h-60"
    >
      <TeamChat />
    </div>
  </div>
</template>

<script setup></script>
