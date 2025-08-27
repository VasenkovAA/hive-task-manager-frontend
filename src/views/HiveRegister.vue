<template>
  <div class="register-page">
    <!-- Локальное уведомление об ошибке -->
    <HiveAlert 
      v-if="localError" 
      :message="localError" 
      type="error" 
      dismissible 
    />
    
    <div class="register-container">
      <div class="register-header">
        <div class="register-logo">
          <HiveIcon />
          <span class="register-logo-text">Hive</span>
        </div>
        <router-link to="/" class="back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>На главную</span>
        </router-link>
      </div>
      
      <div class="register-body">
        <h2 class="register-title">Создание аккаунта</h2>
        
        <form class="auth-form" @submit.prevent="handleRegister">
          <HiveInput
            id="name"
            type="text"
            label="Имя"
            placeholder="Ваше имя"
            v-model="name"
            required
          />
          
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
            placeholder="Придумайте пароль"
            v-model="password"
            required
          />
          
          <HiveInput
            id="confirmPassword"
            type="password"
            label="Подтверждение пароля"
            placeholder="Повторите пароль"
            v-model="confirmPassword"
            :error="error"
            required
          />
          
          <HiveButton type="submit" :loading="loading" fullWidth>
            Зарегистрироваться
          </HiveButton>
        </form>
        
        <div class="auth-footer">
          <p>Уже есть аккаунт? <router-link to="/login" class="auth-link">Войти</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useNotifications } from '@/composables/useNotifications'
import HiveIcon from '@/components/HiveIcon.vue'
import HiveInput from '@/components/HiveInput.vue'
import HiveButton from '@/components/HiveButton.vue'
import HiveAlert from '@/components/HiveAlert.vue'

export default {
  name: 'HiveRegister',
  components: {
    HiveIcon,
    HiveInput,
    HiveButton,
    HiveAlert
  },
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const localError = ref('')
    const router = useRouter()
    
    const { loading, error, register } = useAuth()
    const { addNotification } = useNotifications()
    
    const handleRegister = async () => {
      localError.value = ''
      
      if (password.value !== confirmPassword.value) {
        localError.value = 'Пароли не совпадают'
        return
      }
      
      if (password.value.length < 6) {
        localError.value = 'Пароль должен содержать не менее 6 символов'
        return
      }
      
      try {
        await register({
          name: name.value,
          email: email.value,
          password: password.value
        })
        
        // Показываем успешное уведомление
        addNotification('Регистрация прошла успешно! Теперь вы можете войти в систему.', 'success')
        
        // Перенаправляем на страницу входа
        router.push('/login?registered=true')
      } catch (err) {
        // Показываем ошибку в глобальных уведомлениях
        addNotification(err.message || 'Ошибка при регистрации')
        
        // Также показываем ошибку локально
        localError.value = err.message || 'Ошибка при регистрации'
      }
    }
    
    return {
      name,
      email,
      password,
      confirmPassword,
      loading,
      error,
      localError,
      handleRegister
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
  background: var(--hive-gradient);
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