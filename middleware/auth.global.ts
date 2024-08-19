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

  if (to.path.startsWith('/projects/overview/')) {
    const user = useSupabaseUser()
    if (user.value) {
      return navigateTo(to.path.replace('/projects/overview/', '/projects/'))
    }
  }

  if (to.path.startsWith('/projects/')) {
    const user = useSupabaseUser()
    if (!user.value) {
      return navigateTo(to.path.replace('/projects/', '/projects/overview/'))
    }
  }

  if (to.path.startsWith('/teams/overview/')) {
    const user = useSupabaseUser()
    if (user.value) {
      return navigateTo(to.path.replace('/teams/overview/', '/teams/'))
    }
  }

  if (to.path.startsWith('/teams/')) {
    const user = useSupabaseUser()
    if (!user.value) {
      return navigateTo(to.path.replace('/teams/', '/teams/overview/'))
    }
  }
})
