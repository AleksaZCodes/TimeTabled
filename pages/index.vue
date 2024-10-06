<template>
  <Hero />
  <section
    class="mx-auto flex max-w-7xl flex-col items-center justify-center gap-10 px-6 py-14 lg:flex-row lg:gap-16 lg:py-28"
    id="app"
  >
    <div class="card flex w-full flex-col gap-4 bg-base-200 p-4 shadow"></div>
  </section>
</template>

<script setup>
import IdeasCard from '~/components/IdeasCard.vue'
useHead({
  title: 'Stop Guessing, Start Connecting | TimeTabled',
  meta: [
    {
      name: 'description',
      content:
        'No more back-and-forth—add your timetables and let TimeTabled find the perfect times for you and your team to meet.'
    }
  ]
})
</script>
