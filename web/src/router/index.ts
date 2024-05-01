import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageNotFoundView from '@/views/PageNotFoundView.vue'
import AboutView from '@/views/AboutView.vue'
import MapView from '@/views/MapView.vue'
import AdminView from '@/views/AdminView.vue'
import TableView from '@/views/TableView.vue'

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
      path: '/admin',
      name: 'admin',
      component: AdminView,
    },
    {
      path: '/table',
      name: 'table',
      component: TableView,
    },
    {
      path: '/:catchall(.*)*',
      name: 'PageNotFound',
      component: PageNotFoundView,
    },
  ],
})

export default router
