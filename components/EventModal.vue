<template>
  <div>
    <!-- Button to open the modal -->
    <button
      class="btn btn-sm w-full"
      :onclick="`schedule${schedule}Day${day}Modal.showModal()`"
    >
      <FontAwesome class="text-lg text-primary" icon="plus" />
    </button>

    <!-- Modal structure -->
    <dialog
      class="modal"
      :id="`schedule${schedule}Day${day}Modal`"
      ref="dialog"
    >
      <div class="modal-box flex flex-col gap-4">
        <!-- Close button in the top right corner -->
        <form class="absolute right-2 top-2" method="dialog">
          <button class="btn btn-circle btn-ghost btn-sm">
            <FontAwesome icon="xmark" />
          </button>
        </form>

        <h3 class="text-xl font-bold">Add available period</h3>
        <form @submit.prevent="submitEvent">
          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between gap-2">
              <div>
                <input
                  class="rounded-btn bg-base-200 p-2 px-4 text-xl font-bold md:text-2xl"
                  v-model="startTime"
                  :class="
                    $device.isFirefox || $device.isSafari || $device.isIos
                      ? ''
                      : 'sr-only mt-12'
                  "
                  type="time"
                  ref="startTimeInput"
                />
                <div
                  class="btn w-fit bg-base-200 text-xl font-bold md:text-2xl"
                  v-if="
                    !($device.isFirefox || $device.isSafari || $device.isIos)
                  "
                  @click="openStartTimeInput"
                >
                  <FontAwesome class="text-primary" icon="clock" />&nbsp;{{
                    startTime
                  }}
                </div>
              </div>

              <FontAwesome class="text-lg" icon="caret-right" />

              <div>
                <input
                  class="rounded-btn bg-base-200 p-2 px-4 text-xl font-bold md:text-2xl"
                  v-model="endTime"
                  :class="
                    $device.isFirefox || $device.isSafari || $device.isIos
                      ? ''
                      : 'sr-only mt-12'
                  "
                  type="time"
                  ref="endTimeInput"
                />
                <div
                  class="btn w-fit bg-base-200 text-xl font-bold md:text-2xl"
                  v-if="
                    !($device.isFirefox || $device.isSafari || $device.isIos)
                  "
                  @click="openEndTimeInput"
                >
                  <FontAwesome class="text-primary" icon="clock" />&nbsp;{{
                    endTime
                  }}
                </div>
              </div>
            </div>

            <button class="btn btn-primary btn-block mt-4" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script setup>
const props = defineProps({
  day: {
    type: Number,
    required: true
  },
  schedule: {
    type: Number,
    required: true
  }
})

const startTimeInput = ref(null)
const startTime = ref('08:00')
const endTimeInput = ref(null)
const endTime = ref('08:45')

const duration = computed(() => {
  const start = new Date(0, 0, 0, ...startTime.value.split(':'))
  const end = new Date(0, 0, 0, ...endTime.value.split(':'))
  return (end - start) / 1000 / 60
})

const schedulesStore = useSchedulesStore()
const dialog = ref(null) // Reference for the modal

const openStartTimeInput = () => {
  startTimeInput.value.showPicker()
}

const openEndTimeInput = () => {
  endTimeInput.value.showPicker()
}

const submitEvent = () => {
  if (duration.value <= 0) {
    alert('End time must be after start time')
    return
  }

  // check if there is an event overlapping
  if (
    schedulesStore
      .getEventsForDay(props.schedule, props.day)
      .some(
        event =>
          (startTime.value >= event.startTime &&
            startTime.value < event.endTime) ||
          (endTime.value > event.startTime && endTime.value <= event.endTime) ||
          (startTime.value <= event.startTime && endTime.value >= event.endTime)
      )
  ) {
    alert('There is already an event in that time')
    return
  }

  const newEvent = {
    day: props.day,
    startTime: startTime.value,
    endTime: endTime.value
  }

  schedulesStore.addEvent(props.schedule, newEvent)
  dialog.value.close()
}
</script>
