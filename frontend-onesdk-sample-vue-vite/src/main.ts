import './assets/main.css'

import { createApp } from 'vue'
// import App from './App.vue'
import MainPage from './MainPage.vue'
import router from './routes'

createApp(MainPage).use(router).mount('#app')
