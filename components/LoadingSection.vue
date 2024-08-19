<template>
  <div
    class="flex items-center justify-center"
    :class="`${aspectRatioMapping[aspectRatio]} ${width} ${height}`"
  >
    <span class="loading loading-infinity loading-lg"></span>
  </div>
</template>

<script setup>
defineProps({
  aspectRatio: {
    type: String,
    default: 'video'
  },
  width: {
    type: String,
    default: 'w-full'
  },
  height: {
    type: String,
    default: ''
  }
})

const aspectRatioMapping = {
  video: 'aspect-video',
  square: 'aspect-square'
}
</script>
