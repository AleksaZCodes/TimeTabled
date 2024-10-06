<template>
  <div
    class="flex w-full min-w-48 flex-col gap-4 rounded-xl bg-base-100 p-2 shadow"
  >
    <h2 class="text-center text-lg font-bold">{{ day }}</h2>
    <div class="flex flex-col gap-2" v-if="events.length">
      <div
        class="flex items-center justify-between rounded-xl bg-primary bg-opacity-50 p-2 text-white"
        v-for="event in events"
        :key="schedule + day + event.startTime"
      >
        <span class="font-bold">{{ event.startTime }}</span>
        <span
          >{{
            formatDuration(calculateDuration(event.startTime, event.endTime))
          }}
        </span>
        <button
          class="btn btn-circle btn-ghost btn-sm"
          @click="schedulesStore.removeEvent(schedule, event)"
        >
          <FontAwesome icon="xmark" />
        </button>
      </div>
    </div>
    <EventModal :id="day" :day="index" :schedule="schedule" />
  </div>
</template>

<script setup>
defineProps({
  day: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  schedule: {
    type: Number,
    required: true
  },
  events: {
    type: Array,
    default: () => []
  }
})

const schedulesStore = useSchedulesStore()

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
</script>
