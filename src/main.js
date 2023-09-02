import { createApp } from 'vue'
import App from './App.vue'

// Router
import router from '@/router';

// Store
import store from "@/store";

// Axios
import axios from '@/services/axiosApi';

// Vuetify
import vuetify from "@/plugins/vuetify";
import VueMobileDetection from 'vue-mobile-detection'

// icons
import CustomIcon from "@/icons/CustomIcon.vue";

// Create APP
const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.component('CustomIcon', CustomIcon);

app.use(VueMobileDetection)
app.use(router);
app.use(store);
app.use(vuetify);

app.mount('#app')
