import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/hands-on/1',
      name: 'mockup',
      component: () => import('../components/hands-on/1.MockUp/WeatherMockup.vue'),
      meta: { handsOn: 1 },
    },
    {
      path: '/hands-on/2',
      name: 'composition',
      component: () => import('../components/hands-on/2.Composition/WeatherComposition.vue'),
      meta: { handsOn: 2 },
    },
    {
      path: '/hands-on/3',
      name: 'component',
      component: () => import('../components/hands-on/3.Component/WeatherParent.vue'),
      meta: { handsOn: 3 },
    },
    {
      path: '/',
      name: 'weather-home',
      component: () => import('../views/WeatherHomeView.vue'),
      meta: { handsOn: 4 },
    },
    {
      path: '/about',
      name: 'weather-about',
      component: () => import('../views/WeatherAboutView.vue'),
      meta: { handsOn: 4 },
    },
    {
      path: '/guide',
      name: 'weather-guide',
      component: () => import('../views/WeatherGuideView.vue'),
      meta: { handsOn: 4 },
    },
    {
      path: '/weather/:cityId',
      name: 'weather-detail',
      component: () => import('../views/WeatherDetailView.vue'),
      meta: { handsOn: 4 },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
