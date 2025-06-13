import { createRouter, createWebHistory } from 'vue-router'
import Firstpage from '@/views/layout/Firstpage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Firstpage,
    },
  ],
})

export default router
