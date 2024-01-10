import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import App from './App.vue'

// Style
import "./assets/scss/app.scss";

// Router
import router from '@/router';

// I18
import i18n from "@/i18n/i18n";

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
const head = createHead()

app.config.globalProperties.$axios = axios;

app.use(i18n);
app.use(router);
app.use(head)
app.use(createPrismic(prismicConfig));
app.use(store);
app.use(vuetify);

if (localStorage.getItem('jwtToken')) {
  store.commit('auth/setAccessToken', localStorage.getItem('jwtToken'));
}

app.mount('#app')
