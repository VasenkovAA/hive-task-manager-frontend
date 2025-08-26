<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Логотип -->
        <router-link to="/" class="logo">
          <HiveIcon />
          <span class="logo-text">Hive</span>
        </router-link>

        <!-- Навигация -->
        <nav class="nav" :class="{ 'nav-active': menuActive }">
          <ul class="nav-list">
            <li class="nav-item">
              <router-link to="/" class="nav-link" @click="closeMenu">Главная</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/features" class="nav-link" @click="closeMenu">Возможности</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/pricing" class="nav-link" @click="closeMenu">Тарифы</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" @click="closeMenu">О нас</router-link>
            </li>
          </ul>
        </nav>

        <!-- Кнопки действий -->
        <div class="header-actions">
          <button class="login-btn" @click="openHiveLoginModal">Войти</button>
          <router-link to="/register" class="cta-button">Начать бесплатно</router-link>
        </div>

        <!-- Кнопка мобильного меню -->
        <button class="mobile-menu-button" @click="toggleMenu" :aria-expanded="menuActive">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Модальное окно авторизации с Teleport -->
    <Teleport to="body">
      <HiveLoginModal v-if="showHiveLoginModal" @close="showHiveLoginModal = false" />
    </Teleport>
  </header>
</template>

<script>
import HiveLoginModal from '@/components/HiveLoginModal.vue'
import HiveIcon from '@/components/HiveIcon.vue'

export default {
  name: 'HiveHeader',
  components: {
    HiveLoginModal,
    HiveIcon
  },
  data() {
    return {
      menuActive: false,
      showHiveLoginModal: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
    closeMenu() {
      this.menuActive = false;
    },
    openHiveLoginModal() {
      this.showHiveLoginModal = true;
    }
  }
}
</script>

<style scoped>
.header {
  background: var(--hive-gradient);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
  transition: opacity 0.3s;
}

.logo:hover {
  opacity: 0.9;
}

.logo-icon {
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 1.5rem;
}

.nav {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
  padding: 0.5rem 0;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: white;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--hive-primary);
  transition: width 0.3s;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.login-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.cta-button {
  background-color: var(--hive-primary);
  color: var(--hive-dark);
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  text-decoration: none;
}

.cta-button:hover {
  background-color: var(--hive-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.mobile-menu-button {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
  padding: 0;
  position: relative;
}

.mobile-menu-button span {
  width: 100%;
  height: 2px;
  background-color: white;
  margin: 2px 0;
  transition: all 0.3s;
  transform-origin: center;
}

.mobile-menu-button[aria-expanded="true"] span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-button[aria-expanded="true"] span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-button[aria-expanded="true"] span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Адаптивность */
@media (max-width: 968px) {
  .nav {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background: var(--hive-gradient);
    flex-direction: column;
    padding: 2rem;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }

  .nav-active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-list {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }

  .header-actions {
    display: none;
  }

  .mobile-menu-button {
    display: flex;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.25rem;
  }
  
  .header {
    padding: 0.75rem 0;
  }
}
</style>