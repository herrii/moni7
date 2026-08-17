import { ref, readonly } from 'vue'
import type { UserInterface } from '@/models/user.model'
import { getActiveUser, setActiveUser as setActiveUserService } from '@/services/user.service'

const activeUserRef = ref<UserInterface | null>(null)
const isLoadingRef = ref(false)

export const useActiveUser = () => {
  const refreshActiveUser = async (): Promise<UserInterface | null> => {
    isLoadingRef.value = true
    try {
      const user = await getActiveUser()
      activeUserRef.value = user
      return user
    } catch (err) {
      console.error('Failed to load active user:', err)
      return null
    } finally {
      isLoadingRef.value = false
    }
  }

  const switchUser = async (userId: number): Promise<UserInterface> => {
    isLoadingRef.value = true
    try {
      const user = await setActiveUserService(userId)
      activeUserRef.value = user
      return user
    } finally {
      isLoadingRef.value = false
    }
  }

  return {
    activeUser: readonly(activeUserRef),
    isLoading: readonly(isLoadingRef),
    refreshActiveUser,
    switchUser
  }
}
