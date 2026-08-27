import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import App from './components/practices/AppPractice.vue'
import router from './router'

createApp(App).use(createPinia()).use(router).mount('#app')
