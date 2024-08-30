export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    boards: [],
    currentProjectId: null,
    currentBoardId: null
  }),

  actions: {
    async fetchTasks(projectId) {
      const supabase = useSupabaseClient()
      const user = useSupabaseUser()

      try {
        const { data, error } = await supabase
          .from('tasks')
          .select(
            `
            id,
            board_id,
            name,
            description, 
            due_date, 
            assignee, 
            created_at, 
            converted
          `
          )
          .eq('project_id', projectId)
          .eq('created_by', user.value.id)
          .order('due_date', { ascending: false })

        if (error) throw error

        this.tasks = data
      } catch (error) {
        alert(`Error fetching tasks: ${error.message}`)
      }
    }
  }
})
