import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import HomeMovies from '../views/HomeMovies.vue'
import FavoriteList from '../views/FavoriteList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home Movies',
      component: HomeMovies,
      beforeEnter: (to, from, next) => {
        if (JSON.parse(localStorage.getItem('user'))?.token) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/favorites',
      name: 'Favorite List',
      component: FavoriteList,
      beforeEnter: (to, from, next) => {
        if (JSON.parse(localStorage.getItem('user'))?.token) {
          next();
        } else {
          next('/login');
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    } */
  ]
})

export default router
