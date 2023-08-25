import { createApp } from 'vue'
import App from './App.vue'

// Router
import router from '@/router';

// Store
import store from "@/store";

// Axios
import axios from '@/services/axios';

// Vuetify
import vuetify from "@/plugins/vuetify";

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router);
app.use(store);
app.use(vuetify);

app.mount('#app')
