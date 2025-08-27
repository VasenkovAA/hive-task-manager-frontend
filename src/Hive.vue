<template>
  <div id="Hive">
    <HiveHeader />
    <main>
      <!-- Глобальные уведомления -->
      <div class="notifications-container">
        <HiveAlert
          v-for="notification in notifications"
          :key="notification.id"
          :message="notification.message"
          :type="notification.type"
          :timeout="notification.timeout"
          @close="removeNotification(notification.id)"
        />
      </div>
      
      <router-view />
    </main>
    <HiveFooter />
  </div>
</template>

<script>
import HiveHeader from './components/HiveHeader.vue'
import HiveFooter from './components/HiveFooter.vue'
import HiveAlert from './components/HiveAlert.vue'
import { useNotifications } from './composables/useNotifications'

export default {
  name: 'HiveApp',
  components: {
    HiveHeader,
    HiveFooter,
    HiveAlert
  },
  setup() {
    const { notifications, removeNotification } = useNotifications()
    
    // Глобальная обработка ошибок
    const handleGlobalError = (event) => {
      console.error('Global error:', event.error)
      // Можно добавить логику для отправки ошибок в сервис мониторинга
    }
    
    // Добавляем глобальный обработчик ошибок
    window.addEventListener('error', handleGlobalError)
    window.addEventListener('unhandledrejection', handleGlobalError)
    
    return {
      notifications,
      removeNotification
    }
  }
}
</script>

<style>
.notifications-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  max-width: 400px;
}
</style>