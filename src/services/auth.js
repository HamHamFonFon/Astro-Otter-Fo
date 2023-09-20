import store from '@/store'; // Import the Vuex store
// import axios from '@/services/axios'; // Import the Axios instance

export async function login() {
    return store.dispatch('auth/fetchLogin');
}

export async function refreshToken() {
    return store.dispatch('auth/fetchRefreshToken');
}