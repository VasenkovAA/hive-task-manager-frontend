<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L20 6L16 10L12 6L16 2Z" fill="#FDDB44"/>
            <path d="M22 8L26 12L22 16L18 12L22 8Z" fill="#FDDB44"/>
            <path d="M22 16L26 20L22 24L18 20L22 16Z" fill="#FDDB44"/>
            <path d="M16 22L20 26L16 30L12 26L16 22Z" fill="#FDDB44"/>
            <path d="M10 16L14 20L10 24L6 20L10 16Z" fill="#FDDB44"/>
            <path d="M10 8L14 12L10 16L6 12L10 8Z" fill="#FDDB44"/>
          </svg>
          <span class="modal-logo-text">Hive</span>
        </div>
        <button class="close-button" @click="$emit('close')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div class="modal-body">
        <h2 class="modal-title">Вход в аккаунт</h2>
        
        <form class="auth-form" @submit.prevent="handleLogin">
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
              placeholder="Ваш пароль" 
              class="form-input"
              required
            >
          </div>
          
          <button type="submit" class="auth-submit-btn">Войти</button>
        </form>
        
     
        
        <div class="auth-footer">
          <p>Нет аккаунта? <router-link to="/register" class="auth-link" @click="$emit('close')">Зарегистрироваться</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authAPI } from '@/config'

export default {
  name: 'HiveLoginModal',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        // Используем endpoint из конфига
        const response = await fetch(`${authAPI.url}${authAPI.endpoints.login}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        })
        
        if (response.ok) {
          // Обработка успешного входа
          this.$emit('close')
        } else {
          // Обработка ошибок
          console.error('Ошибка авторизации')
        }
      } catch (error) {
        console.error('Ошибка сети:', error)
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 1rem;
}

.modal-content {
  background: linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%);
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
  background: rgba(0, 0, 0, 0.1);
}

.modal-logo {
  display: flex;
  align-items: center;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
}

.modal-logo-text {
  margin-left: 0.5rem;
}

.close-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.modal-body {
  padding: 1.5rem;
}

.modal-title {
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.auth-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-input:focus {
  outline: none;
  border-color: #fdbb2d;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(253, 187, 45, 0.2);
}

.auth-submit-btn {
  width: 100%;
  background-color: #fdbb2d;
  color: #1a2a6c;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.auth-submit-btn:hover {
  background-color: #ffcc44;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.auth-divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;
  color: rgba(255, 255, 255, 0.7);
}

.auth-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  z-index: 1;
}

.auth-divider span {
  background: rgba(255, 255, 255, 0.2);
  padding: 0 1rem;
  position: relative;
  z-index: 2;
}

.auth-footer {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
}

.auth-link {
  color: #fffebaff;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.auth-link:hover {
  color: #ffcc44;
  text-decoration: underline;
}

/* Адаптивность */
@media (max-width: 480px) {
  .modal-content {
    max-width: 100%;
  }
  
  .modal-header {
    padding: 1rem 1rem 0.5rem;
  }
  
  .modal-body {
    padding: 1rem;
  }
}
</style>