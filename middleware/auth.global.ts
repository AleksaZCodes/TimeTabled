const unneedRoutes = ['/login', '/signup']
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
})
