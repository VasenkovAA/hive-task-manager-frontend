<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Колонка с логотипом и описанием -->
        <div class="footer-column">
          <div class="footer-logo">
            <HiveIcon />
            <span class="logo-text">Hive</span>
          </div>
          <p class="footer-description">
            Интуитивно понятный и функциональный трекер задач, который поможет вам эффективно организовывать свою личную и командную работу.
          </p>
          <!-- Ссылка на GitHub -->
          <div class="github-link">
            <a href="https://github.com/your-username/hive-task-manager" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>

        <!-- Колонка "Продукт" -->
        <div class="footer-column">
          <h3 class="footer-title">Продукт</h3>
          <ul class="footer-links">
            <li><router-link to="/features">Возможности</router-link></li>
            <li><router-link to="/integrations">Интеграция в вашу систему</router-link></li>
            <li><router-link to="/overview">Обзор</router-link></li>
          </ul>
        </div>

        <!-- Колонка "Ресурсы" -->
        <div class="footer-column">
          <h3 class="footer-title">Ресурсы</h3>
          <ul class="footer-links">
            <li><router-link to="/blog">Блог</router-link></li>
            <li><router-link to="/documentation">Документация</router-link></li>
            <li><router-link to="/support">Поддержка</router-link></li>
            <li><router-link to="/api">API для разработчиков</router-link></li>
          </ul>
        </div>

        <!-- Колонка "Компания" -->
        <div class="footer-column">
          <h3 class="footer-title">Компания</h3>
          <ul class="footer-links">
            <li><router-link to="/about">О нас</router-link></li>
            <li><router-link to="/contacts">Контакты</router-link></li>
          </ul>
        </div>
      </div>

      <!-- Нижняя часть футера -->
      <div class="footer-bottom">
        <div class="footer-bottom-links">
          <router-link to="/privacy">Политика конфиденциальности</router-link>
          <router-link to="/terms">Условия использования</router-link>
          <router-link to="/cookies">Cookie</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import HiveIcon from '@/components/HiveIcon.vue'

export default {
  name: 'HiveFooter',
  components: {
    HiveIcon
  }
}
</script>

<style scoped>
.footer {
  background: var(--hive-gradient);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-column:first-child {
  grid-column: 1 / -1;
}

@media (min-width: 768px) {
  .footer-column:first-child {
    grid-column: auto;
  }
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.footer-logo .logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  margin-left: 0.75rem;
}

.footer-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  max-width: 300px;
}

.github-link {
  margin-top: 1.5rem;
}

.github-link a {
  display: inline-flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s;
  padding: 0.5rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
}

.github-link a:hover {
  color: white;
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.github-link svg {
  margin-right: 0.5rem;
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.8);
}

.footer-title {
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.footer-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 2px;
  background-color: var(--hive-primary);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: white;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer-bottom-links {
  display: flex;
  gap: 1.5rem;
}

.footer-bottom-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s;
  font-size: 0.875rem;
}

.footer-bottom-links a:hover {
  color: white;
}

/* Адаптивность */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-bottom-links {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .github-link a {
    padding: 0.4rem;
  }
  
  .github-link span {
    font-size: 0.9rem;
  }
}
</style>