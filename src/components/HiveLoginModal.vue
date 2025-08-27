<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-logo">
            <HiveIcon />
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
            <HiveInput
              id="email"
              type="email"
              label="Email"
              placeholder="Ваш email"
              v-model="email"
              :error="error"
              required
            />
            
            <HiveInput
              id="password"
              type="password"
              label="Пароль"
              placeholder="Ваш пароль"
              v-model="password"
              required
            />
            
            <HiveButton type="submit" :loading="loading" fullWidth>
              Войти
            </HiveButton>
          </form>
          
          <div class="auth-footer">
            <p>Нет аккаунта? <router-link to="/register" class="auth-link" @click="$emit('close')">Зарегистрироваться</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import HiveIcon from '@/components/HiveIcon.vue'
import HiveInput from '@/components/HiveInput.vue'
import HiveButton from '@/components/HiveButton.vue'

export default {
  name: 'HiveLoginModal',
  components: {
    HiveIcon,
    HiveInput,
    HiveButton
  },
  emits: ['close'],
  setup(props, { emit }) {
    const email = ref('')
    const password = ref('')
    
    const { loading, error, login } = useAuth()
    
    const handleLogin = async () => {
      try {
        await login(email.value, password.value)
        emit('close')
      } catch (err) {
        // Ошибка уже установлена в useAuth
      }
    }
    
    return {
      email,
      password,
      loading,
      error,
      handleLogin
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
  background: var(--hive-gradient);
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

.auth-footer {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
}

.auth-link {
  color: #fffeba;
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