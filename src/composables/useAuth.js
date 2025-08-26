import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authAPI } from '@/config'

export function useAuth() {
  const loading = ref(false)
  const error = ref('')
  const router = useRouter()

  const handleAuth = async (url, data) => { // Убрали successMessage
    loading.value = true
    error.value = ''
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Произошла ошибка')
      }

      const responseData = await response.json()
      
      // Сохраняем токен (пример)
      if (responseData.token) {
        localStorage.setItem('authToken', responseData.token)
      }
      
      // Перенаправляем пользователя
      await router.push('/dashboard')
      
      return responseData
    } catch (err) {
      error.value = err.message
      console.error('Auth error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const login = (email, password) => {
    return handleAuth(
      `${authAPI.url}${authAPI.endpoints.login}`,
      { email, password }
    )
  }

  const register = (userData) => {
    return handleAuth(
      `${authAPI.url}${authAPI.endpoints.register}`,
      userData
    )
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    router.push('/')
  }

  return {
    loading,
    error,
    login,
    register,
    logout,
  }
}