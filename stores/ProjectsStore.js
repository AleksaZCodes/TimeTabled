import { Octokit } from '@octokit/rest'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    currentTeamId: null,
    eisenhower: Array(16).fill('')
  }),

  actions: {
    async fetchProjects() {
      if (!this.currentTeamId) return

      const supabase = useSupabaseClient()
      const user = useSupabaseUser()

      try {
        const { data: projectsData, error: projectsError } = await supabase
          .from('projects')
          .select(
            `
              id,
              created_at,
              idea_id,
              team_id,
              chat_id,
              project_status_id,
              github_repository_id,
              public,
              projects_users_roles (
                role_id,
                roles (role)
              )
            `
          )
          .eq('team_id', this.currentTeamId)
          .eq('projects_users_roles.user_id', user.value.id)
          .order('created_at', { ascending: false })

        if (projectsError) throw projectsError

        this.projects = projectsData

        const ideasStore = useIdeasStore()
        this.projects.forEach(async (project, i) => {
          let idea = ideasStore.convertedIdeas.find(
            idea => idea.id === project.idea_id
          )

          if (!idea) {
            await ideasStore.fetchIdeaById(project.idea_id)
          }

          idea = ideasStore.convertedIdeas.find(
            idea => idea.id === project.idea_id
          )

          this.projects[i].title = idea.title
          this.projects[i].description = idea.description

          this.projects[i].urgency = idea.urgency
          this.projects[i].importance = idea.importance
        })
      } catch (error) {
        alert(`Error fetching projects: ${error.message}`)
      }

      this.sortProjects()
      this.generateEisenhower()
    },

    async addProject(ideaId, pub) {
      if (!this.currentTeamId) return

      const supabase = useSupabaseClient()
      const user = useSupabaseUser()
      const userStore = useUserStore()

      if (!userStore.github_access_token) {
        alert('Please log out and log back in.')
        return
      }

      const { data: chat } = await supabase
        .from('chats')
        .insert({})
        .select('id')
        .single()

      if (!chat) {
        alert('Failed to create chat.')
        return
      }

      const project = {
        team_id: this.currentTeamId,
        idea_id: ideaId,
        chat_id: chat.id,
        public: pub
      }

      const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single()

      if (error) {
        alert(error.message)
        return
      }

      project.id = data.id

      const octokit = new Octokit({
        auth: userStore.github_access_token
      })

      const templateOwner = 'AleksaZCodes'
      const templateRepo = 'LeanLaunch-Project-Template'

      const { data: repo } = await octokit.rest.repos.createUsingTemplate({
        template_owner: templateOwner,
        template_repo: templateRepo,
        name: `LeanLaunch-Project-${project.id}`,
        private: !pub
      })

      if (!repo) {
        alert('Failed to create repository.')
        return
      }

      project.github_repository_id = repo.id

      const { error: e } = await supabase
        .from('projects')
        .update({ github_repository_id: repo.id })
        .eq('id', project.id)

      if (e) {
        alert(e.message)
        return
      }

      const { error: e2 } = await supabase.from('projects_users_roles').insert({
        user_id: user.value.id,
        role_id: 1,
        project_id: project.id
      })

      if (e2) {
        alert(e2.message)
        return
      }

      const ideasStore = useIdeasStore()
      await ideasStore.convertIdea(ideaId, true)

      const idea = ideasStore.convertedIdeas.find(idea => idea.id === ideaId)

      project.title = idea.title
      project.description = idea.description

      project.urgency = idea.urgency
      project.importance = idea.importance

      this.projects.unshift(project)

      this.generateEisenhower()
      this.sortProjects()
    },

    async setUrgencyAndImportance(projectId, urgency, importance) {
      const ideaId = this.projects.find(
        project => project.id === projectId
      ).idea_id
      const ideasStore = useIdeasStore()
      await ideasStore.setUrgencyAndImportance(ideaId, urgency, importance)

      this.projects = this.projects.map(project => {
        if (project.id === projectId) {
          project.urgency = urgency
          project.importance = importance
        }
        return project
      })
    },

    async updateProjectIdea(projectId, title, description) {
      const ideaId = this.projects.find(
        project => project.id === projectId
      ).idea_id
      const ideasStore = useIdeasStore()
      await ideasStore.updateIdea(ideaId, title, description)

      this.projects = this.projects.map(project => {
        if (project.id === projectId) {
          project.title = title
          project.description = description
        }
        return project
      })
    },

    async deleteProject(projectId) {
      const project = this.projects.find(project => project.id === projectId)
      const ideaId = project.idea_id

      const supabase = useSupabaseClient()
      const { error: e1 } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)

      if (e1) {
        alert(e1.message)
        return
      }

      const { error: e2 } = await supabase
        .from('projects_users_roles')
        .delete()
        .eq('project_id', projectId)

      if (e2) {
        alert(e2.message)
        return
      }

      const { error: e3 } = await supabase
        .from('chats')
        .delete()
        .eq('id', project.chat_id)

      if (e3) {
        alert(e3.message)
        return
      }

      const { error: e4 } = await supabase
        .from('messages')
        .delete()
        .eq('chat_id', project.chat_id)

      if (e4) {
        alert(e4.message)
        return
      }

      this.projects = this.projects.filter(project => project.id !== projectId)

      const ideasStore = useIdeasStore()
      await ideasStore.convertIdea(ideaId, false)
      await ideasStore.setUrgencyAndImportance(ideaId, null, null)

      this.generateEisenhower()
    },

    generateEisenhower() {
      const eisenhower = Array(16).fill('')
      this.projects.forEach(project => {
        if (!project.urgency || !project.importance) return
        const x = Math.floor(project.urgency * 4)
        const y = Math.floor(project.importance * 4)
        const eisenhowerIndex = (4 - y) * 4 + x - 1 // Calculate the index with -1 adjustment
        eisenhower[eisenhowerIndex] = project.id
      })
      this.eisenhower = eisenhower
    },

    sortProjects() {
      // Helper functions
      const getQuadrantPriority = (urgency, importance) => {
        if (urgency >= 0.5 && importance >= 0.5) return 1 // First Quadrant
        if (urgency >= 0.5 && importance < 0.5) return 2 // Fourth Quadrant
        if (urgency < 0.5 && importance >= 0.5) return 3 // Second Quadrant
        if (urgency < 0.5 && importance < 0.5) return 4 // Third Quadrant
      }

      const euclideanDistance = (urgency, importance) => {
        return Math.sqrt(Math.pow(1 - urgency, 2) + Math.pow(1 - importance, 2))
      }

      // Separate projects into two groups
      const bothDefined = this.projects.filter(
        idea => idea.urgency !== undefined && idea.importance !== undefined
      )
      const notBothDefined = this.projects.filter(
        idea => idea.urgency === undefined || idea.importance === undefined
      )

      // Sort projects with both urgency and importance
      bothDefined.sort((a, b) => {
        const aPriority = getQuadrantPriority(a.urgency, a.importance)
        const bPriority = getQuadrantPriority(b.urgency, b.importance)

        // Sort primarily by quadrant priority
        if (aPriority !== bPriority) return aPriority - bPriority

        // Fallback: Sort by Euclidean distance within the same quadrant
        const aDistance = euclideanDistance(a.urgency, a.importance)
        const bDistance = euclideanDistance(b.urgency, b.importance)

        if (aDistance !== bDistance) return aDistance - bDistance

        // Final Fallback: Sort by creation date
        const aCreatedAt = new Date(a.created_at).getTime()
        const bCreatedAt = new Date(b.created_at).getTime()

        return bCreatedAt - aCreatedAt
      })

      // Sort projects missing urgency or importance only by creation date
      notBothDefined.sort((a, b) => {
        const aCreatedAt = new Date(a.created_at).getTime()
        const bCreatedAt = new Date(b.created_at).getTime()

        return bCreatedAt - aCreatedAt
      })

      // Combine the sorted arrays
      this.projects = [...bothDefined, ...notBothDefined]
    }
  }
})
