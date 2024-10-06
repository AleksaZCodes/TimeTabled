<template>
  <LoadingSection v-if="loading" />
  <div
    class="alert bg-primary font-bold text-white"
    v-if="!loading && isFirefox"
    role="alert"
  >
    There are known issues on Firefox. Please use Chrome for the best
    experience.
  </div>
  <Hero v-if="!loading" />
  <section
    class="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 py-14 lg:gap-8 lg:py-28"
    id="app"
    v-if="!loading"
  >
    <div
      class="card flex w-full flex-col gap-4 bg-base-200 p-4 shadow"
      v-if="schedulesStore.schedules.length > 1"
    >
      <h2 class="text-2xl font-bold">Recommended times</h2>

      <div class="mt-2 flex gap-4 overflow-x-auto">
        <div
          class="flex w-full min-w-48 flex-col gap-4 rounded-xl bg-base-100 p-2 shadow"
          v-for="(day, i) in days"
        >
          <h2 class="text-center text-lg font-bold">{{ day }}</h2>
          <div class="flex flex-col gap-2">
            <div
              class="flex items-center justify-between rounded-xl bg-primary p-2 text-white"
              v-for="interval in schedulesStore.findCommonIntervals(i)"
            >
              <span class="font-bold">{{ interval.startTime }}</span>
              <span>{{
                formatDuration(
                  calculateDuration(interval.startTime, interval.endTime)
                )
              }}</span>
              <span class="font-bold"
                >{{ interval.count }} /
                {{ schedulesStore.schedules.length }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="card flex w-full flex-col gap-4 bg-base-200 p-4 shadow"
      v-for="schedule in schedulesStore.schedules.length"
      :key="'schedule' + schedule"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1">
          <button
            class="btn btn-square btn-ghost btn-sm"
            @click="schedulesStore.removeSchedule(schedule - 1)"
          >
            <FontAwesome class="text-lg text-primary" icon="xmark" />
          </button>
          <h2 class="text-2xl font-bold">Timetable {{ schedule }}</h2>
        </div>

        <button
          class="btn btn-square btn-ghost btn-sm"
          @click="copyToClipboard(schedule - 1)"
        >
          <FontAwesome class="text-lg text-primary" icon="share-nodes" />
        </button>
      </div>

      <div class="mt-2 flex gap-4 overflow-x-auto">
        <ScheduleCard
          v-for="(day, i) in days"
          :key="day"
          :day="day"
          :index="i"
          :schedule="schedule - 1"
          :events="schedulesStore.getEventsForDay(schedule - 1, i)"
        />
      </div>
    </div>
    <button
      class="btn btn-primary btn-sm"
      @click="schedulesStore.schedules.push([])"
    >
      <FontAwesome class="text-lg" icon="plus" />
      Add Timetable
    </button>
  </section>
</template>

<script setup>
useSeoMeta({
  ogImage: '/banner.png'
})

useHead({
  link: {
    rel: 'icon',
    type: 'image/ico',
    href: '/favicon.ico'
  },
  title: 'Stop Guessing, Start Connecting | TimeTabled',
  meta: [
    {
      name: 'description',
      content:
        'Let TimeTabled find the overlap in your timetables, so you can focus on what really matters—time spent together.'
    }
  ]
})

const loading = ref(true)
const isFirefox = ref(false)
const schedulesStore = useSchedulesStore()
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const calculateDuration = (startTime, endTime) => {
  const start = new Date(0, 0, 0, ...startTime.split(':'))
  const end = new Date(0, 0, 0, ...endTime.split(':'))
  return (end - start) / 1000 / 60
}

const formatDuration = minutes => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  // Conditionally include hours in the result
  return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`
}

const copyToClipboard = schedule => {
  const encoded = schedulesStore.encodeSchedule(schedule)
  let url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/`
  url += '?timetable=' + encoded

  if (encoded == 'W10%3D') {
    alert('Empty timetable!')
    return
  }

  if (url.length <= 2000) {
    navigator.clipboard.writeText(url)
    alert(
      'Copied a link to clipboard, with your timetable encoded within it. Share it with your team.'
    )
  } else {
    navigator.clipboard.writeText(encoded)
    alert(
      'Copied your timetable encoded inside a string. Share it with your team (beware, it is longer than 2000 characters).'
    )
  }
}

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const timetable = urlParams.get('timetable')
  if (timetable) {
    schedulesStore.decodeSchedule(timetable)
  }
  loading.value = false
  isFirefox.value = navigator.userAgent.toLowerCase().includes('firefox')
})
</script>
