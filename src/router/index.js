import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import HomeMovies from '../views/HomeMovies.vue'
import FavoriteList from '../views/FavoriteList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'Home Movies',
      meta: { requiresAuth: true },
      component: HomeMovies,
    },
    {
      path: '/favorites',
      name: 'Favorite List',
      meta: { requiresAuth: true },
      component: FavoriteList,
    },
    {
      path: '/login',
      name: 'Login',
      meta: { requiresAuth: false },
      component: Login,
      beforeEnter: (to, from, next) => {
        if (JSON.parse(localStorage.getItem('user'))?.token) {
          next('/home');
        } else {
          next();
        }
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!JSON.parse(localStorage.getItem('user'))?.token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
