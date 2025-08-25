import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/AppHome.vue'
import About from '@/views/AppAbout.vue'

const routes = [
  {
    path: '/',
    name: 'AppHome',
    component: Home
  },
  {
    path: '/about',
    name: 'AppAbout',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router