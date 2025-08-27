import { ref } from 'vue'

export function useNotifications() {
  const notifications = ref([])
  
  const addNotification = (message, type = 'error', timeout = 5000) => {
    const id = Date.now()
    notifications.value.push({
      id,
      message,
      type,
      timeout
    })
    
    // Автоматическое удаление уведомления
    if (timeout > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, timeout)
    }
    
    return id
  }
  
  const removeNotification = (id) => {
    notifications.value = notifications.value.filter(notification => notification.id !== id)
  }
  
  const clearNotifications = () => {
    notifications.value = []
  }
  
  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications
  }
}