<template>
  <div>
    <button
      class="btn btn-square btn-ghost btn-sm"
      onclick="chatModal.showModal()"
    >
      <FontAwesome
        class="text-lg text-primary"
        icon="arrow-up-right-from-square"
      />
    </button>

    <dialog class="modal" id="chatModal" ref="dialog">
      <div class="modal-box flex flex-col gap-4 bg-base-200">
        <form class="absolute right-2 top-2" method="dialog">
          <button class="btn btn-circle btn-ghost btn-sm">
            <FontAwesome icon="xmark" />
          </button>
        </form>

        <div class="flex h-[80vh] flex-col justify-between gap-1 pt-4">
          <TeamChat />
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup></script>
