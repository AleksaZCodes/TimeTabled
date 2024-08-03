<template>
  <div class="relative aspect-square w-full pb-4 pl-4">
    <div
      class="absolute left-0 top-0 flex h-full -translate-x-12 -translate-y-2 items-center"
    >
      <div class="origin-center -rotate-90 transform">
        <span class="text-sm">
          Importance <FontAwesome icon="arrow-right" />
        </span>
      </div>
    </div>
    <div
      class="absolute bottom-0 left-0 flex w-full translate-x-2 translate-y-2 justify-center"
    >
      <span class="text-sm"> Urgency <FontAwesome icon="arrow-right" /> </span>
    </div>

    <div
      class="grid aspect-square grid-cols-4 grid-rows-4 gap-2 rounded-2xl bg-base-100 p-2"
    >
      <div
        class="group aspect-square rounded-lg bg-base-200 hover:bg-base-300 md:rounded-xl"
        v-for="i in 16"
        :key="i"
      >
        <div
          class="h-full w-full rounded-lg group-hover:border-4 md:rounded-xl"
          :class="
            [1, 3, 6, 8, 9, 11, 14, 16].includes(i)
              ? 'border-base-200 bg-primary'
              : 'border-primary bg-base-300'
          "
          :style="{
            opacity: calculateOpacity(i)
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const calculateOpacity = index => {
  const rangeFrom = 0.2
  const rangeTo = 0.8

  const row = Math.ceil(index / 4)
  const col = ((index - 1) % 4) + 1
  const distanceFromStart = Math.abs(row - 4) + Math.abs(col - 1)
  const maxDistance = 3 + 3 // max distance is from (4, 1) to (1, 4)
  const normalizedDistance = distanceFromStart / maxDistance
  return rangeFrom + normalizedDistance * (rangeTo - rangeFrom)
}
</script>
