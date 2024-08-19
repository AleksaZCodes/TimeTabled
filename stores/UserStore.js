export const useUserStore = defineStore('user', {
  state: () => ({
    newUser: true,
    userMetadata: null
  }),
  persist: true
})
