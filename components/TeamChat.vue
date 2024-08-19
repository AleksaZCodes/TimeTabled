<template>
  <LoadingSection v-if="loading" width="" height="h-full" />
  <div
    class="flex w-full flex-col gap-2 overflow-y-auto"
    v-else
    ref="messagediv"
  >
    <ChatBubble
      v-for="message in chatsStore.messages"
      :key="message.id"
      :text="message.content"
      :time="
        new Date(message.sent_at).getHours() +
        ':' +
        new Date(message.sent_at).getMinutes()
      "
      :received="message.sent_by !== user.id"
    />
  </div>

  <form class="flex flex-col gap-1" @submit.prevent="sendMessage">
    <div class="divider my-0"></div>

    <div class="flex gap-2">
      <textarea
        class="textarea w-full break-words text-base"
        v-model="messageInput"
        ref="messagearea"
        rows="1"
        required
        placeholder="Write a message..."
        :disabled="loading || disabled"
      ></textarea>

      <button
        class="btn btn-square bg-base-100"
        type="submit"
        :disabled="!messageInput.trim() || loading || disabled"
      >
        <FontAwesome class="text-xl text-primary" icon="arrow-up" />
      </button>
    </div>
  </form>
</template>

<script setup>
const chatsStore = useChatsStore()
const teamsStore = useTeamsStore()
const user = useSupabaseUser()

const loading = ref(true)
const disabled = ref(false)

const messagearea = ref(null)
const messagediv = ref(null)

const messageInput = ref('')

watch(
  () => teamsStore.currentTeamId,
  async () => {
    if (teamsStore.currentChatId) {
      loading.value = true
      chatsStore.stopRealtime()
      chatsStore.currentChatId = teamsStore.currentChatId
      await chatsStore.fetchMessages()
      chatsStore.startRealtime()

      loading.value = false
      setTimeout(scrollToBottom, 1)
    }
  }
)

const sendMessage = async () => {
  disabled.value = true

  await chatsStore.sendMessage(messageInput.value.trim())

  disabled.value = false
  messageInput.value = ''

  setTimeout(scrollToBottom, 1)
}

const scrollToBottom = () => {
  messagediv.value.scrollTop = messagediv.value.scrollHeight
}

onMounted(async () => {
  if (teamsStore.currentChatId) {
    chatsStore.currentChatId = teamsStore.currentChatId
    await chatsStore.fetchMessages()
    chatsStore.startRealtime()
  }

  messagearea.value.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  })

  loading.value = false

  setTimeout(scrollToBottom, 1)
})

onBeforeUnmount(() => {
  chatsStore.stopRealtime()
})
</script>
