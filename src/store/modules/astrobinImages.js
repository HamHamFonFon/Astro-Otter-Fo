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
        commit('message/setMessage', {
            'loading': true,
            'type': 'warning',
            'message': 'Loading astrobin image "' + id + '"',
            'httpCode': null
        }, { root: true });

        try {
            const wsResponse = await ImagesWs.GET_IMAGE_BY_ID(id);
            commit('message/setMessage', {
                'loading': true,
                'type': 'success',
                'message': 'Image "' + wsResponse.title + '" from Astrobin loaded',
                'httpCode': 200
            }, { root: true });
            commit('updateImage', wsResponse);
            commit('setTotalCount', 1);
            commit('message/setLoading', false, { root: true });
        } catch (error) {
            commit('message/setMessage', {
                'loading': true,
                'type': 'error',
                'message': error.message,
                'httpCode': error.code
            }, { root: true });
        }
    },

};

const mutations = {
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
    sortedImages: (state) => {
        if ('' === state.sortCriteria) {
            return state.images
        }

        return [...state.images].sort((a, b) => {
            if ('likes' === state.sortCriteria) return (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0)
            if ('views' === state.sortCriteria) return (a.views > b.views) ? -1 : ((b.views > a.views) ? 1 : 0)
            if ('uploaded_most' === state.sortCriteria) return new Date(b.uploaded) - new Date(a.uploaded)
            if ('uploaded_old' === state.sortCriteria) return new Date(a.uploaded) - new Date(b.uploaded)
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};