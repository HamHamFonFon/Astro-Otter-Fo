import { AuthWs } from '@/repositories/api/auth';

const state = () => {
    return {
        accessToken: null,
        refreshToken: null,
    }
}

const mutations = {
    setAccessToken(state, accessToken) {
        state.accessToken = accessToken
    },
    setRefreshToken(state, refreshToken) {
        state.refreshToken = refreshToken
    }
}

const actions = {
    async fetchLogin({ commit }) {
        console.log('Store Auth, action login');
        try {
            const wsResponse = await AuthWs.GET_LOGIN;
            const { accessToken, refreshToken } = wsResponse;
            console.log(accessToken, refreshToken);
            commit('setAccessToken', accessToken);
            commit('setRefreshToken', refreshToken)

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    async fetchRefreshToken({ commit }) {
        console.log('Store Auth, action refreshToken');
        try {
            const wsResponse = await AuthWs.GET_REFRESH(state.refreshToken)
            const { jwtToken } = wsResponse.data;
            commit('setAccessToken', jwtToken);

            return true;
        } catch (error) {
            return false;
        }
    }
}

const getters = {
    isLoggedIn(state) {
        return !!state.accessToken;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};