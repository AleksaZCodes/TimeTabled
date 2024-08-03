<template>
  <div class="chat chat-start gap-2 p-0" v-if="received">
    <div class="avatar chat-image self-start">
      <div class="w-8 rounded-full">
        <img :alt="name" :src="avatar" />
      </div>
    </div>
    <div class="rounded-2xl rounded-tl-none bg-base-100 p-4 py-2">
      <h3 class="text-sm font-bold text-primary">{{ name }}</h3>
      <p>
        {{ text }}
      </p>
      <p class="text-end text-xs opacity-50">
        <time>{{ time }}</time>
      </p>
    </div>
  </div>

  <div
    class="max-w-fit self-end rounded-2xl rounded-tr-none bg-base-100 p-4 py-2"
    v-else
  >
    <p>
      {{ text }}
    </p>
    <p class="text-end text-xs opacity-50">
      <time>{{ time }}</time>
    </p>
  </div>
</template>

<script setup>
defineProps({
  received: {
    type: Boolean,
    default: true
  },
  text: {
    type: String,
    default: 'Empty message'
  },
  time: {
    type: String,
    default: '12:46'
  },
  name: {
    type: String,
    default: 'John'
  },
  avatar: {
    type: String,
    default:
      'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
  }
})
</script>
