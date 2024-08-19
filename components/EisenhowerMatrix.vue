<template>
  <div class="relative aspect-square w-full pb-4 pl-4">
    <div
      class="absolute left-0 top-0 flex h-full -translate-x-12 -translate-y-2 items-center"
    >
      <div class="origin-center -rotate-90 transform">
        <span class="text-sm">
          {{ importanceLabel }} <FontAwesome icon="arrow-right" />
        </span>
      </div>
    </div>
    <div
      class="absolute bottom-0 left-0 flex w-full translate-x-2 translate-y-2 justify-center"
    >
      <span class="text-sm">
        {{ urgencyLabel }} <FontAwesome icon="arrow-right" />
      </span>
    </div>

    <LoadingSection v-if="loading" aspect-ratio="square" />

    <div
      class="grid aspect-square grid-cols-4 grid-rows-4 gap-2 rounded-2xl bg-base-100 p-2"
      v-else
    >
      <div class="dropdown dropdown-left" v-for="i in 16" :key="'square' + i">
        <div
          class="group aspect-square rounded-lg bg-base-200 hover:bg-base-300 md:rounded-xl"
          tabindex="0"
          role="button"
        >
          <div
            class="h-full w-full rounded-lg group-hover:border-4 md:rounded-xl"
            :class="
              props.store.eisenhower[i - 1] !== ''
                ? 'border-base-200 bg-primary'
                : 'border-primary bg-base-300'
            "
            :style="{
              opacity: calculateOpacity(i)
            }"
          ></div>
        </div>
        <div
          class="card dropdown-content z-[1] max-w-32 bg-base-100 shadow"
          tabindex="0"
        >
          <select
            class="select select-bordered select-sm max-w-xs"
            v-model="eisenhower[i - 1]"
            @change="() => setItem(i)"
          >
            <option value=""></option>
            <option
              v-if="items.length"
              v-for="item in items"
              :key="'ideaSelect' + item.id"
              :value="item.id"
            >
              {{ item.title }}
            </option>
            <option v-else disabled>No {{ itemsName }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  store: {
    type: Object,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  itemsName: {
    type: String,
    required: true
  },
  urgencyLabel: {
    type: String,
    default: 'Urgency'
  },
  importanceLabel: {
    type: String,
    default: 'Importance'
  }
})

const loading = ref(false)
const eisenhower = ref(props.store.eisenhower)

const setItem = async index => {
  loading.value = true

  let newItemId = eisenhower.value[index - 1]

  // If the selected option is empty, clear the current item
  if (newItemId === '') {
    const oldItemId = props.store.eisenhower[index - 1]
    if (oldItemId !== '') {
      await props.store.setUrgencyAndImportance(oldItemId, null, null)
      props.store.eisenhower[index - 1] = ''
    }
    loading.value = false
    return
  }

  // Calculate the row and column from the index
  const row = Math.ceil(index / 4)
  const col = ((index - 1) % 4) + 1

  // Calculate urgency and importance based on position
  const urgency = col / 4
  const importance = (5 - row) / 4

  // Clear the existing item in the selected cell
  const oldItemId = props.store.eisenhower[index - 1]
  if (oldItemId !== '') {
    await props.store.setUrgencyAndImportance(oldItemId, null, null)
    props.store.eisenhower[index - 1] = ''
  }

  // Set the new item's urgency and importance
  props.store.eisenhower[index - 1] = newItemId
  await props.store.setUrgencyAndImportance(newItemId, urgency, importance)

  eisenhower.value = props.store.eisenhower

  loading.value = false
}

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
