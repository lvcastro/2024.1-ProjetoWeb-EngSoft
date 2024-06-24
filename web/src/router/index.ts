import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageNotFoundView from '@/views/PageNotFoundView.vue'
import AboutView from '@/views/AboutView.vue'
import MapView from '@/views/MapView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminTableView from '@/views/AdminTableView.vue'
import ReportTableView from '@/views/ReportTableView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/reports',
      name: 'reportTable',
      component: ReportTableView,
    },
    {
      path: '/admin',
      name: 'admin table',
      component: AdminTableView,
    },
    {
      path: '/:catchall(.*)*',
      name: 'PageNotFound',
      component: PageNotFoundView,
    },
  ],
})

export default router
