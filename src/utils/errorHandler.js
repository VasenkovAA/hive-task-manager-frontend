import { useNotifications } from '@/composables/useNotifications'

export function handleApiError(error, context = '') {
  console.error(`API Error${context ? ` in ${context}` : ''}:`, error)
  
  const { addNotification } = useNotifications()
  
  let message = 'Произошла ошибка'
  
  if (error.status === 401) {
    message = 'Необходима авторизация'
    // Можно добавить перенаправление на страницу входа
  } else if (error.status === 403) {
    message = 'Доступ запрещен'
  } else if (error.status === 404) {
    message = 'Ресурс не найден'
  } else if (error.status >= 500) {
    message = 'Ошибка сервера. Попробуйте позже'
  } else if (error.message) {
    message = error.message
  }
  
  addNotification(message)
  
  return message
}

export function handleNetworkError(error, context = '') {
  console.error(`Network Error${context ? ` in ${context}` : ''}:`, error)
  
  const { addNotification } = useNotifications()
  const message = 'Ошибка сети. Проверьте подключение к интернету'
  
  addNotification(message)
  
  return message
}