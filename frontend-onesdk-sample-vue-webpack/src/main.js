import { createApp } from 'vue';
import MainPage from './MainPage.vue';
import router from './routes';

createApp(MainPage)
	.use(router)
	.mount('#app');
