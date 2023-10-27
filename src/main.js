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

// Vuetify
import vuetify from "@/plugins/vuetify";

// Recaptcha
import { VueReCaptcha } from "vue-recaptcha-v3";
import captcha from "@/configs/captcha";
console.log(captcha)
// Create APP
const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router);
app.use(createPrismic({
    endpoint: 'https://astro-otter.prismic.io/api/v2'
}));
app.use(store);
app.use(vuetify);
app.use(VueReCaptcha, { siteKey: captcha.siteKey})

if (localStorage.getItem('jwtToken')) {
    store.commit('auth/setAccessToken', localStorage.getItem('jwtToken'));
}

app.mount('#app')
