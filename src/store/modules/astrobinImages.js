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
    /**
     *
     * @param commit
     * @param formData
     * @param offset
     * @param limit
     * @returns {Promise<void>}
     */
    async fetchImages({ commit }, { formData, offset, limit}) {
        if (0 === offset) {
            commit('resetState');
        }

        commit('message/setMessage', {
            'loading': true,
            'type': 'warning',
            'message': 'Load images from Astrobin API',
            'httpCode': null
        }, { root: true });

        try {
            console.log(formData)
            // let params = {};
            // params[formData.type] = formData.term;
            let params = {
                'title__icontains': 'm42'
            }
            const wsResponse = await ImagesWs.GET_IMAGES_BY(params, offset, limit);
            commit('message/setMessage', {
                'loading': true,
                'type': 'success',
                'message': 'Images loaded',
                'httpCode': 200
            }, { root: true });

            // WS response
            commit('setTotalCount', wsResponse.totalCount);
            commit('setOffset', wsResponse.offset);
            wsResponse.listImages.forEach(r => {
                commit('addImage', {
                    id: r.astrobin_id,
                    image: r.urlRegular,
                    lazyImage: r.urlGallery,
                    date: r.date,
                    title: r.title,
                    user: r.user,
                    views: r.views,
                    likes: r.likes
                });
            });

            // Display
            commit('message/setLoading', false, { root: true });

        } catch (error) {
            commit('message/setMessage', {
                'loading': true,
                'type': 'error',
                'message': error.message,
                'httpCode': error.code
            }, { root: true });
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
    setOffset: (state, offset) => {
        state.offset = offset;
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