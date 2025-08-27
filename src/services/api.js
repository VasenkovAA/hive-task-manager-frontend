import { authAPI } from '@/config'
import { handleApiError, handleNetworkError } from '@/utils/errorHandler'

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    // Добавляем токен авторизации, если он есть
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)
      
      // Обрабатываем ответ
      const data = await response.json().catch(() => ({}))
      
      if (!response.ok) {
        const error = {
          message: data.message || `Ошибка ${response.status}: ${response.statusText}`,
          status: response.status,
          data
        }
        
        // Обрабатываем ошибку API
        handleApiError(error, endpoint)
        throw error
      }

      return data
    } catch (error) {
      // Обрабатываем сетевые ошибки
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        handleNetworkError(error, endpoint)
      }
      
      // Пробрасываем ошибку дальше для обработки в компонентах
      throw error
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' })
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' })
  }
}

// Создаем экземпляр API сервиса
export const apiService = new ApiService(authAPI.url)