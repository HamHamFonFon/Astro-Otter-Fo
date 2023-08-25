import store from '@/store'; // Import the Vuex store
// import axios from '@/services/axios'; // Import the Axios instance

export async function login() {
    console.log('Dispatch into auth/fetchLogin');
    return store.dispatch('auth/fetchLogin');
}

export async function refreshTokens() {
    return store.dispatch('auth/fetchRefreshToken');
}