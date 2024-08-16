const unneedRoutes = ['/login']
const privateRoutes = ['/dashboard']

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (unneedRoutes.includes(to.path)) {
    const user = useSupabaseUser()
    if (user.value) {
      return navigateTo('/dashboard')
    }
  }

  if (privateRoutes.includes(to.path)) {
    const user = useSupabaseUser()
    if (!user.value) {
      return navigateTo('/login')
    }
  }

  if (to.path.startsWith('/projects/')) {
    if (to.path.startsWith('/projects/overview')) {
      return
    }
    const user = useSupabaseUser()
    if (!user.value) {
      return navigateTo(to.path.replace('/projects/', '/projects/overview/'))
    }
  }

  if (to.path.startsWith('/teams/')) {
    if (to.path.startsWith('/teams/overview')) {
      return
    }
    const user = useSupabaseUser()
    if (!user.value) {
      return navigateTo(to.path.replace('/teams/', '/teams/overview/'))
    }
  }
})
