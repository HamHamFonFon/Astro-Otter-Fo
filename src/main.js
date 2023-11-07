import { createApp } from 'vue'
import App from './App.vue'

// Router
import router from '@/router';

// Store
import store from "@/store";

// Axios
import axios from '@/services/axiosApi';

// Prismic
import { createPrismic } from '@prismicio/vue'
import { prismicConfig } from './configs/prismic'

// Vuetify
import vuetify from "@/plugins/vuetify";

// Create APP
const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router);
app.use(createPrismic(prismicConfig));
app.use(store);
app.use(vuetify);

if (localStorage.getItem('jwtToken')) {
    store.commit('auth/setAccessToken', localStorage.getItem('jwtToken'));
}

app.mount('#app')
