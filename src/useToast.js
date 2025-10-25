import { ref, readonly } from 'vue'

const message = ref(null)
const type = ref('success') // 'success', 'error', 'info', 'warning'
const duration = ref(3000)
let timeoutId = null

function showToast(msg, t = 'success', d = 3000) {
  clearTimeout(timeoutId)
  message.value = msg
  type.value = t
  duration.value = d
  timeoutId = setTimeout(() => {
    message.value = null
  }, duration.value)
}

function clearToast() {
  clearTimeout(timeoutId)
  message.value = null
}

export function useToast() {
  return {
    message: readonly(message),
    type: readonly(type),
    showToast,
    clearToast,
  }
}
