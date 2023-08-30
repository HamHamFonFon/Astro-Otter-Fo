const initialState = () => {
    return {
        images: [],
        totalCount: 0,
        offset: 0,
        sortCriteria: ''
    }
};
const state = initialState;

const actions = {
    async fetchImageById({ commit }, id) {
        commit('message/setLoading', true, { root: true });
        commit('message/setType', 'warning', { root: true });
        commit('message/setMessage', 'Loading astrobin image "' + id + '"', { root: true })
        commit('message/setHttpCode', null, { root: true })

        try {

        } catch (error) {
            commit('message/setType', 'error', { root: true });
            commit('message/setMessage', error.message, { root: true })
            commit('message/setHttpCode', error.code, { root: true })
            commit('message/setLoading', true, { root: true });
        }
    }
};

const mutations = {
    resetState: (state) => {
        const s = initialState();
        Object.keys(s).forEach(key => {
            state[key] = s[key];
        })
    },
    updateImage: (state, newImage) => {
        state.images = [newImage];
    },

}

const getters = {
    getImageById: (state) => (id) => {
        return state.images.find(image => id === image.astrobin_id);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};