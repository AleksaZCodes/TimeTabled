import { Octokit } from '@octokit/rest'

export const useUserStore = defineStore('user', {
  state: () => ({
    newUser: true,
    userMetadata: null,
    github_access_token: null,
    github_username: null,
    requestedUser: null
  }),

  actions: {
    async fetchGithubUser() {
      if (!this.github_access_token) return

      const octokit = new Octokit({
        auth: this.github_access_token
      })

      const { data } = await octokit.users.getAuthenticated()

      this.github_username = data.login
    },

    async fetchUserById(id) {
      const supabase = useSupabaseClient()
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error(error)
        return
      }

      const { data: data1, error: error1 } = await supabase
        .from('users')
        .select(
          `
    id,
    users_teams (
      team_id,
      teams (
        id,
        projects (
          id as project_id,
          ideas (
            title,
            description
          )
        )
      )
    )
  `
        )
        .eq('id', id)
        .eq('users_teams.teams.projects.public', true)

      if (error1) {
        console.error(error1)
        return
      }

      this.requestedUser = { ...data, projects: data1 }
    }
  },
  persist: true
})
