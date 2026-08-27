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
      path: '/hands-on/5',
      name: 'store-home',
      component: () => import('../components/hands-on/5.Store/WeatherStoreHome.vue'),
      meta: { handsOn: 5 },
    },
    {
      path: '/hands-on/5/weather/:cityId',
      name: 'store-detail',
      component: () => import('../components/hands-on/5.Store/WeatherStoreDetail.vue'),
      meta: { handsOn: 5 },
    },
    {
      path: '/hands-on/6',
      name: 'axios-home',
      component: () => import('../components/hands-on/6.Axios/WeatherAxiosHome.vue'),
      meta: { handsOn: 6 },
    },
    {
      path: '/hands-on/6/weather/:locationId',
      name: 'axios-detail',
      component: () => import('../components/hands-on/6.Axios/WeatherAxiosDetail.vue'),
      meta: { handsOn: 6 },
    },
    {
      path: '/hands-on/7',
      name: 'ui-home',
      component: () => import('../components/hands-on/7.UI-Library/WeatherUIHome.vue'),
      meta: { handsOn: 7 },
    },
    {
      path: '/hands-on/7/weather/:locationId',
      name: 'ui-detail',
      component: () => import('../components/hands-on/7.UI-Library/WeatherUIDetail.vue'),
      meta: { handsOn: 7 },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
