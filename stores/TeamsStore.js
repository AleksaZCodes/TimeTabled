export const useTeamsStore = defineStore('teams', {
  state: () => ({
    teams: [],
    currentTeamId: null
  }),

  actions: {
    async fetchTeams() {
      const supabase = useSupabaseClient()
      const user = useSupabaseUser()

      try {
        const { data: teamsData, error: teamsError } = await supabase
          .from('teams')
          .select(
            `
            id, 
            name, 
            chat_id, 
            teams_users_roles (
              role_id,
              roles (
                role
              )
            )
          `
          )
          .eq('teams_users_roles.user_id', user.value.id)
          .order('created_at', { ascending: false })

        if (teamsError) throw teamsError

        // Simplified mapping to flatten the roles data
        const teamsWithRoles = teamsData.map(team => ({
          id: team.id,
          name: team.name,
          chat_id: team.chat_id,
          role: team.teams_users_roles[0]?.roles?.role || 'Unknown'
        }))

        this.teams = teamsWithRoles

        if (!this.currentTeamId && teamsWithRoles.length > 0) {
          this.currentTeamId = teamsWithRoles[0].id
        }
      } catch (error) {
        alert(`Error fetching teams: ${error.message}`)
      }
    },

    async createTeam({ name, isPublic = false }) {
      const supabase = useSupabaseClient()
      const user = useSupabaseUser()

      try {
        // Create a chat entry
        const { data: chatData, error: chatError } = await supabase
          .from('chats')
          .insert({})
          .select('id')
          .single()

        if (chatError) throw chatError

        const chatId = chatData.id

        // Create a team entry
        const { data: teamData, error: teamError } = await supabase
          .from('teams')
          .insert({
            name,
            public: isPublic,
            chat_id: chatId
          })
          .select('id')
          .single()

        if (teamError) throw teamError

        const teamId = teamData.id

        // Associate the user with the team
        const { error: userTeamError } = await supabase
          .from('users_teams')
          .insert({
            user_id: user.value.id,
            team_id: teamId
          })

        if (userTeamError) throw userTeamError

        // Assign a role to the user in the team
        const { error: teamUserRoleError } = await supabase
          .from('teams_users_roles')
          .insert({
            team_id: teamId,
            user_id: user.value.id,
            role_id: 1 // Assuming 1 is the role ID for the default role
          })

        if (teamUserRoleError) throw teamUserRoleError

        // Fetch the role name
        const { data: roleData, error: roleError } = await supabase
          .from('roles')
          .select('role')
          .eq('id', 1)
          .single()

        if (roleError) throw roleError

        // Update the store with the new team
        this.currentTeamId = teamId
        this.teams.unshift({
          id: teamId,
          name,
          chat_id: chatId,
          role: roleData.role
        })
      } catch (error) {
        alert(`Error creating team: ${error.message}`)
      }
    }
  },

  getters: {
    currentChatId: state =>
      state.teams.find(team => team.id === state.currentTeamId)?.chat_id
  },

  persist: true
})
