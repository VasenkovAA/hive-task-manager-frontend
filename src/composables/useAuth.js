import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiService } from '@/services/api'
import { authAPI } from '@/config'

export function useAuth() {
  const loading = ref(false)
  const error = ref('')
  const router = useRouter()

  const handleAuth = async (endpoint, data, successRedirect = '/dashboard') => {
    loading.value = true
    error.value = ''
    
    try {
      const responseData = await apiService.post(endpoint, data)
      
      // Сохраняем токен
      if (responseData.token) {
        localStorage.setItem('authToken', responseData.token)
      }
      
      // Перенаправляем пользователя
      if (successRedirect) {
        await router.push(successRedirect)
      }
      
      return responseData
    } catch (err) {
      error.value = err.message || 'Произошла ошибка'
      console.error('Auth error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const login = (email, password) => {
    return handleAuth(authAPI.endpoints.login, { email, password })
  }

  const register = (userData) => {
    return handleAuth(authAPI.endpoints.register, userData, '/login?registered=true')
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    router.push('/')
  }

  // Проверяем, авторизован ли пользователь
  const isAuthenticated = () => {
    return !!localStorage.getItem('authToken')
  }

  return {
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated
  }
}