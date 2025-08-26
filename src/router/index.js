import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HiveHome.vue'
import About from '@/views/HiveAbout.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router