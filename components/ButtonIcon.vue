<template>
  <button class="btn btn-outline btn-block group">
    <FontAwesome
      class="text-xl text-base-content group-hover:text-base-100"
      :icon="icon"
    />
    <slot />
  </button>
</template>

<script setup>
defineProps({
  icon: {
    type: [String, Array],
    required: true
  }
})
</script>
