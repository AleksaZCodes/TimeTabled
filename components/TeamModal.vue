<template>
  <div>
    <button class="btn btn-sm" onclick="teamModal.showModal()">
      <FontAwesome icon="people-group" /> Team
    </button>

    <dialog class="modal" id="teamModal">
      <div class="modal-box flex flex-col gap-6">
        <form class="absolute right-2 top-2" method="dialog">
          <button class="btn btn-circle btn-ghost btn-sm">
            <FontAwesome icon="xmark" />
          </button>
        </form>

        <!-- placeholder -->
      </div>
    </dialog>
  </div>
</template>

<script setup>
// const supabase = useSupabaseClient()

const loading = ref(false)
</script>
