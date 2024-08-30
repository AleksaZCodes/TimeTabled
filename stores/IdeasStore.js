export const useIdeasStore = defineStore('ideas', {
  state: () => ({
    ideas: [],
    convertedIdeas: [],
    eisenhower: Array(16).fill('')
  }),
  actions: {
    async fetchIdeas() {
      const supabase = useSupabaseClient()
      const { data, error } = await supabase
        .from('ideas')
        .select(
          'id, title, description, urgency, importance, created_at, converted'
        )
        .eq('created_by', useSupabaseUser().value.id)
        .order('created_at', { ascending: false })
      if (error) {
        console.error(error)
        return
      }

      this.ideas = data.filter(idea => !idea.converted)
      this.convertedIdeas = data.filter(idea => idea.converted)

      this.generateEisenhower()
      this.sortIdeas()
    },
    async fetchIdeaById(id) {
      const supabase = useSupabaseClient()
      const { data, error } = await supabase
        .from('ideas')
        .select(
          'id, title, description, urgency, importance, created_at, converted'
        )
        .eq('id', id)
        .single()
      if (error) {
        console.error(error)
        return
      }

      if (data.converted) {
        this.convertedIdeas.push(data)
      } else {
        this.ideas.push(data)
      }

      this.generateEisenhower()
      this.sortIdeas()
    },
    async addIdea(idea) {
      const supabase = useSupabaseClient()
      const { data, error } = await supabase
        .from('ideas')
        .insert(idea)
        .select('id')
        .single()

      if (error) {
        alert(error.message)
        return
      }

      this.ideas.unshift({ ...idea, id: data.id })
      this.generateEisenhower()
      this.sortIdeas()
    },
    async setUrgencyAndImportance(ideaId, urgency, importance) {
      const supabase = useSupabaseClient()
      const { error } = await supabase
        .from('ideas')
        .update({ urgency: urgency, importance: importance })
        .eq('id', ideaId)
      if (error) {
        alert(error.message)
        return
      }

      this.ideas = this.ideas.map(idea => {
        if (idea.id === ideaId) {
          idea.urgency = urgency
          idea.importance = importance
        }
        return idea
      })
      this.generateEisenhower()
    },
    generateEisenhower() {
      const eisenhower = Array(16).fill('')
      this.ideas.forEach(idea => {
        if (!idea.urgency || !idea.importance) return
        const x = Math.floor(idea.urgency * 4)
        const y = Math.floor(idea.importance * 4)
        const eisenhowerIndex = (4 - y) * 4 + x - 1 // Calculate the index with -1 adjustment
        eisenhower[eisenhowerIndex] = idea.id
      })
      this.eisenhower = eisenhower
      this.sortIdeas()
    },
    sortIdeas() {
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

      // Separate ideas into two groups
      const bothDefined = this.ideas.filter(
        idea => idea.urgency !== undefined && idea.importance !== undefined
      )
      const notBothDefined = this.ideas.filter(
        idea => idea.urgency === undefined || idea.importance === undefined
      )

      // Sort ideas with both urgency and importance
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

      // Sort ideas missing urgency or importance only by creation date
      notBothDefined.sort((a, b) => {
        const aCreatedAt = new Date(a.created_at).getTime()
        const bCreatedAt = new Date(b.created_at).getTime()

        return bCreatedAt - aCreatedAt
      })

      // Combine the sorted arrays
      this.ideas = [...bothDefined, ...notBothDefined]
    },
    async deleteIdea(id) {
      const supabase = useSupabaseClient()
      const { error } = await supabase.from('ideas').delete().eq('id', id)
      if (error) {
        alert(error.message)
        return
      }
      this.ideas = this.ideas.filter(idea => idea.id !== id)
      this.generateEisenhower()
      this.sortIdeas()
    },
    async updateIdea(ideaId, title, description) {
      const supabase = useSupabaseClient()
      const { error } = await supabase
        .from('ideas')
        .update({ title, description })
        .eq('id', ideaId)
      if (error) {
        alert(error.message)
        return
      }

      this.ideas = this.ideas.map(idea => {
        if (idea.id === ideaId) {
          idea.title = title
          idea.description = description
        }
        return idea
      })
      this.sortIdeas()
    },
    async convertIdea(ideaId, converted) {
      const supabase = useSupabaseClient()

      const { error } = await supabase
        .from('ideas')
        .update({ converted })
        .eq('id', ideaId)
      if (error) {
        alert(error.message)
        return
      }

      this.ideas = this.ideas.map(idea => {
        if (idea.id === ideaId) {
          idea.converted = converted
        }
        return idea
      })

      this.ideas = this.ideas.filter(idea => !idea.converted)
      this.convertedIdeas = this.ideas.filter(idea => idea.converted)

      this.generateEisenhower()
      this.sortIdeas()
    }
  }
})
