import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HiveHome.vue'
import About from '@/views/HiveAbout.vue'
import Register from '@/views/HiveRegister.vue'
import Login from '@/views/HiveLogin.vue'

const routes = [
  {
    path: '/',
    name: 'HiveHome',
    component: Home
  },
  {
    path: '/about',
    name: 'HiveAbout',
    component: About
  },
  {
    path: '/register',
    name: 'HiveRegister',
    component: Register
  },
  {
    path: '/login',
    name: 'HiveLogin',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router