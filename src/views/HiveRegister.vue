<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-header">
        <div class="register-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L20 6L16 10L12 6L16 2Z" fill="#FDDB44"/>
            <path d="M22 8L26 12L22 16L18 12L22 8Z" fill="#FDDB44"/>
            <path d="M22 16L26 20L22 24L18 20L22 16Z" fill="#FDDB44"/>
            <path d="M16 22L20 26L16 30L12 26L16 22Z" fill="#FDDB44"/>
            <path d="M10 16L14 20L10 24L6 20L10 16Z" fill="#FDDB44"/>
            <path d="M10 8L14 12L10 16L6 12L10 8Z" fill="#FDDB44"/>
          </svg>
          <span class="register-logo-text">Hive</span>
        </div>
        <router-link to="/" class="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          На главную
        </router-link>
      </div>
      
      <div class="register-body">
        <h2 class="register-title">Создание аккаунта</h2>
        
        <form class="auth-form" @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="name" class="form-label">Имя</label>
            <input 
              type="text" 
              id="name" 
              v-model="name" 
              placeholder="Ваше имя" 
              class="form-input"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              placeholder="Ваш email" 
              class="form-input"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Пароль</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              placeholder="Придумайте пароль" 
              class="form-input"
              required
              minlength="6"
            >
          </div>
          
          <div class="form-group">
            <label for="confirmPassword" class="form-label">Подтверждение пароля</label>
            <input 
              type="password" 
              id="confirmPassword" 
              v-model="confirmPassword" 
              placeholder="Повторите пароль" 
              class="form-input"
              required
            >
          </div>
          
          <div class="form-group" v-if="errorMessage">
            <div class="error-message">{{ errorMessage }}</div>
          </div>
          
          <button type="submit" class="auth-submit-btn" :disabled="loading">
            {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
          </button>
        </form>
        
        <div class="auth-footer">
          <p>Уже есть аккаунт? <router-link to="/login" class="auth-link">Войти</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authAPI } from '@/config'

export default {
  name: 'HiveRegister',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      loading: false
    }
  },
  methods: {
    async handleRegister() {
      // Валидация
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Пароли не совпадают'
        return
      }
      
      if (this.password.length < 6) {
        this.errorMessage = 'Пароль должен содержать не менее 6 символов'
        return
      }
      
      this.loading = true
      this.errorMessage = ''
      
      try {
        // Моковый запрос к API
        const response = await fetch(`${authAPI.url}${authAPI.endpoints.register}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password
          })
        })
        
        if (response.ok) {
          // Моковый ответ для демонстрации
          const data = await response.json()
          console.log('Регистрация успешна:', data)
          
          // Редирект на страницу входа или сразу авторизуем
          this.$router.push('/login')
        } else {
          // Обработка ошибок
          const errorData = await response.json()
          this.errorMessage = errorData.message || 'Ошибка регистрации'
        }
      } catch (error) {
        console.error('Ошибка сети:', error)
        this.errorMessage = 'Ошибка соединения с сервером'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.register-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.register-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
  background: linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%);
  color: white;
}

.register-logo {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.25rem;
}

.register-logo-text {
  margin-left: 0.5rem;
}

.back-link {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  font-size: 0.9rem;
}

.back-link:hover {
  color: white;
  text-decoration: underline;
}

.back-link svg {
  margin-right: 0.5rem;
}

.register-body {
  padding: 2rem;
}

.register-title {
  color: #1a2a6c;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.auth-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #2d3748;
  font-size: 1rem;
  transition: all 0.3s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.form-input::placeholder {
  color: #a0aec0;
}

.form-input:focus {
  outline: none;
  border-color: #fdbb2d;
  box-shadow: 0 0 0 3px rgba(253, 187, 45, 0.2);
}

.error-message {
  color: #e53e3e;
  background: #fed7d7;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  border-left: 3px solid #e53e3e;
}

.auth-submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #fdbb2d 0%, #f9a825 100%);
  color: white;
  border: none;
  padding: 0.875rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.auth-submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #ffcc44 0%, #f9b342 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.auth-submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.auth-footer {
  text-align: center;
  color: #718096;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.auth-link {
  color: #1a2a6c;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.auth-link:hover {
  color: #fdbb2d;
  text-decoration: underline;
}

/* Адаптивность */
@media (max-width: 480px) {
  .register-container {
    max-width: 100%;
  }
  
  .register-header {
    padding: 1.25rem 1.25rem 0.75rem;
  }
  
  .register-body {
    padding: 1.5rem;
  }
  
  .back-link span {
    display: none;
  }
  
  .back-link svg {
    margin-right: 0;
  }
}
</style>