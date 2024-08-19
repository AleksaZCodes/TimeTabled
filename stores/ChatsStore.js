export const useChatsStore = defineStore('chats', {
  state: () => ({
    messages: [],
    currentChatId: null,
    realtimeSubscription: null
  }),

  actions: {
    async fetchMessages() {
      if (!this.currentChatId) return

      const supabase = useSupabaseClient()
      try {
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('chat_id, content, sent_at, sent_by')
          .eq('chat_id', this.currentChatId)
          .order('sent_at', { ascending: true })

        if (messagesError) throw messagesError

        this.messages = messagesData
      } catch (error) {
        alert(`Error fetching messages: ${error.message}`)
      }
    },

    startRealtime() {
      if (!this.currentChatId) return

      const supabase = useSupabaseClient()

      this.realtimeSubscription = supabase
        .channel('chat' + this.currentChatId) // Specify the channel
        .on(
          'postgres_changes',
          {
            event: 'INSERT', // Listen to all changes (INSERT, UPDATE, DELETE)
            schema: 'public',
            table: 'messages',
            filter: `chat_id=eq.${this.currentChatId}` // Filter by chat_id
          },
          payload => {
            this.messages.push(payload.new)
          }
        )
        .subscribe()
    },

    stopRealtime() {
      if (this.realtimeSubscription) {
        this.realtimeSubscription.unsubscribe()
        this.realtimeSubscription = null
      }
    },

    async sendMessage(content) {
      if (!this.currentChatId) return

      const supabase = useSupabaseClient()

      try {
        const { error: insertError } = await supabase.from('messages').insert({
          chat_id: this.currentChatId,
          content
        })

        if (insertError) throw insertError
      } catch (error) {
        alert(`Error sending message: ${error.message}`)
      }
    }
  }
})
