import * as WS from '@/repositories/astrobin/iotd/webservice'
import { ImagesWs } from '@/repositories/astrobin/images';

const state = () => ({
    date: null,
    image: {},
    astrobinImageId: null,
    listTodayImages: []
});

const actions = {
    /**
     *
     * @param commit
     * @returns {Promise<void>}
     */
    async fetchImageOfTheDay({commit}) {
        commit('message/setLoading', true, { root: true });
        commit('message/setType', 'warning', { root: true });
        commit('message/setMessage', 'Loading Image Of The Day from Astrobin...', { root: true })
        commit('message/setHttpCode', null, { root: true })
        try {
            // WS Image Of The Day
            const wsResponse = await WS.GET_TODAY_WS(0, 1);
            commit("setDate", wsResponse.date);
            commit("setAstrobinImageId", wsResponse.astrobinImageId);

            // WS get image from Id
            const wsResponseImage = await ImagesWs.GET_IMAGE_BY_ID(wsResponse.astrobinImageId)
            commit("setImage", wsResponseImage);

            commit('message/setType', 'success', { root: true });
            commit('message/setMessage', 'Image of the day loaded.', { root: true })
            commit('message/setHttpCode', 200, { root: true })
            setTimeout(function() {
                commit('message/setLoading', false, { root: true });
            }, 1000)
            //
        } catch (error) {
            commit('message/setType', 'error', { root: true });
            commit('message/setMessage', error.message, { root: true })
            commit('message/setHttpCode', error.code, { root: true })
        }
    },
    /**
     *
     * @param commit
     * @returns {Promise<void>}
     */
    async fetchListImagesOfTheDay({commit}) {
        try {
            commit('resetStateListImages');
            const wsResponse = await WS.GET_TODAY_WS(1, 16);
            wsResponse.forEach(response => {
                const wsResponseImage = ImagesWs.GET_IMAGE_BY_ID(response.astrobinImageId);
                wsResponseImage.then(r => {
                    commit("addTodayImage", {
                        id: r.astrobin_id,
                        image: r.urlRegular,
                        lazyImage: r.urlGallery,
                        date: response.date,
                        title: r.title,
                        user: r.user,
                        views: r.views,
                        likes: r.likes
                    });
                })
            });
        } catch (error) {
            console.log(error);
        }
    }
};

const mutations = {
    resetStateListImages: (state) => {
        state.listTodayImages = [];
    },
    setDate: (state, date) => {
        state.date = date;
    },
    setAstrobinImageId: (state, astrobinImageId) => {
        state.astrobinImageId = astrobinImageId;
    },
    setImage: (state, image) => {
        state.image = image;
    },
    addTodayImage: (state, todayImage) => {
        state.listTodayImages.push(todayImage);
    },
};

const getters = {
    sortedTodayImages: (state) => {
        return [...state.listTodayImages].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};