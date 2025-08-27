const config = {
  development: {
    apiUrl: 'http://localhost:3000/api',
    authAPI: {
      url: 'http://localhost:3000/auth',
      endpoints: {
        login: '/login',
        register: '/register'
      }
    }
  },
  production: {
    apiUrl: 'https://api.yourdomain.com/api',
    authAPI: {
      url: 'https://api.yourdomain.com/auth',
      endpoints: {
        login: '/login',
        register: '/register'
      }
    }
  }
}

// Автоматически выбираем конфиг в зависимости от окружения
const env = process.env.NODE_ENV || 'development'
export default config[env]

// Для обратной совместимости оставляем именованный экспорт
export const authAPI = config[env].authAPI