import { createRouter, createWebHistory } from 'vue-router'
import Firstpage from '@/views/layout/Firstpage.vue'
import LoginView from '@/views/layout/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
     {
      path: '/',
      name: 'firstpage',
      component: Firstpage,
    },
  ],
})

export default router
