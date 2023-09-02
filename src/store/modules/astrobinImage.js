import { ImagesWs } from '@/repositories/astrobin/images';

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
    /**
     *
     * @param commit
     * @param id
     * @returns {Promise<void>}
     */
    async fetchImageById({ commit }, id) {
        commit('message/setLoading', true, { root: true });
        commit('message/setType', 'warning', { root: true });
        commit('message/setMessage', 'Loading astrobin image "' + id + '"', { root: true })
        commit('message/setHttpCode', null, { root: true })

        try {
            const wsResponse = await ImagesWs.GET_IMAGE_BY_ID(id);
            commit('updateImage', wsResponse);
            commit('setTotalCount', 1);

            commit('message/setType', 'success', { root: true });
            commit('message/setMessage', 'Image "' + wsResponse.title + '" from Astrobin loaded', { root: true })
            commit('message/setHttpCode', 200, { root: true })
            commit('message/setLoading', false, { root: true });
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
    addImage: (state, image) => {
        state.images.push(image);
    },
    updateImage: (state, newImage) => {
        state.images = [newImage];
    },
    setTotalCount: (state, totalCount) => {
        state.totalCount = totalCount;
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