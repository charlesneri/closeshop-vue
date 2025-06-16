import { createRouter, createWebHistory } from 'vue-router'
//import Firstpage from '@/views/layout/Firstpage.vue'
import LoginView from '@/views/layout/LoginView.vue'
import Homepage from '@/views/layout/Homepage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
     {
      path: '/homepage',
      name: 'homepage',
      component: Homepage,
    },
  ],
})

export default router
