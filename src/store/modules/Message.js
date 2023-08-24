const state = () => ({
    message: null,
    type: 'warning',
    httpCode: 0,
    loading: true
});

const actions = {
    postError({ commit }, errorMsg) {
        commit('setError', errorMsg);
    }
};

const mutations = {
    setLoading: (state, payload) => {
        state.loading = payload;
    },
    setType: (state, payload) => {
        state.type = payload;
    },
    setMessage: (state, payload) => {
        state.message = payload;
    },
    setHttpCode: (state, payload) => {
        state.httpCode = payload;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};