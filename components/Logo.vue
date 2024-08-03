<template>
  <NuxtLink
    class="btn flex h-fit min-h-0 w-fit items-center border-none bg-transparent p-0 shadow-none hover:bg-transparent"
    :class="gapSize[size] || gapSize['sm']"
    to="/"
  >
    <FontAwesome
      class="text-primary"
      :class="iconSize[size] || iconSize['sm']"
      icon="rocket"
    />
    <span class="font-bold" :class="textSize[size] || textSize['sm']">
      LeanLaunch
    </span>
  </NuxtLink>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'sm',
    validator(value) {
      return ['sm', 'md', 'lg', 'xl'].includes(value)
    }
  }
})

const textSize = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl'
}

const iconSize = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl',
  xl: 'text-5xl'
}

const gapSize = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
  xl: 'gap-5'
}
</script>
