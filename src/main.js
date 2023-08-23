import { createApp } from 'vue'
import App from './App.vue'

// Router
import router from '@/router';

// Store
import store from "@/store";
// Vuetify
import vuetify from "@/plugins/vuetify";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(vuetify);

app.mount('#app')
