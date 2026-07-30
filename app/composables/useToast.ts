import { ref, readonly } from 'vue'

const toastMessage = ref('')
const toastType = ref<'success' | 'error' | 'warning' | 'info'>('info')
const toastVisible = ref(false)
let toastTimeout: ReturnType<typeof setTimeout> | null = null

export const useToast = () => {
  const showToast = (
    msg: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    duration = 3000
  ) => {
    if (toastTimeout) clearTimeout(toastTimeout)
    
    toastMessage.value = msg
    toastType.value = type
    toastVisible.value = true
    
    toastTimeout = setTimeout(() => {
      toastVisible.value = false
    }, duration)
  }

  const hideToast = () => {
    toastVisible.value = false
    if (toastTimeout) clearTimeout(toastTimeout)
  }

  return {
    message: readonly(toastMessage),
    type: readonly(toastType),
    visible: readonly(toastVisible),
    showToast,
    hideToast
  }
}
export type UseToastReturn = ReturnType<typeof useToast>
