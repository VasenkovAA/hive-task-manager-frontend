<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-header">
        <div class="login-logo">
          <HiveIcon />
          <span class="login-logo-text">Hive</span>
        </div>
        <router-link to="/" class="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>На главную</span>
        </router-link>
      </div>
      
      <div class="login-body">
        <h2 class="login-title">Вход в аккаунт</h2>
        
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
          <p>Нет аккаунта? <router-link to="/register" class="auth-link">Зарегистрироваться</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import HiveIcon from '@/components/HiveIcon.vue'
import HiveInput from '@/components/HiveInput.vue'
import HiveButton from '@/components/HiveButton.vue'

export default {
  name: 'HiveLogin',
  components: {
    HiveIcon,
    HiveInput,
    HiveButton
  },
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    
    const { loading, error, login } = useAuth()
    
    const handleLogin = async () => {
      try {
        await login(email.value, password.value)
        router.push('/dashboard')
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
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.login-container {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.login-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
  background: var(--hive-gradient);
  color: white;
}

.login-logo {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.25rem;
}

.login-logo-text {
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

.login-body {
  padding: 2rem;
}

.login-title {
  color: var(--hive-dark);
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
  color: var(--text-secondary);
  padding-top: 1rem;
  border-top: 1px solid var(--border-light);
}

.auth-link {
  color: var(--hive-dark);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.auth-link:hover {
  color: var(--hive-primary);
  text-decoration: underline;
}

/* Адаптивность */
@media (max-width: 480px) {
  .login-container {
    max-width: 100%;
  }
  
  .login-header {
    padding: 1.25rem 1.25rem 0.75rem;
  }
  
  .login-body {
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