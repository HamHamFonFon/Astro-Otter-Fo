import * as WS from '@/repositories/astrobin/iotd/webservice'
const state = () => ({
    date: null,
    image: {},
    listTodayImages: []
});

const actions = {
    async fetchImageOfTheDay({commit}) {
        commit('message/setLoading', true, { root: true });
        commit('message/setType', 'warning', { root: true });
        commit('message/setMessage', 'Loading Image Of The Day from Astrobin...', { root: true })
        commit('message/setHttpCode', null, { root: true })
        try {
            const wsResponse = await WS.GET_TODAY_WS(0, 1);
            console.log(wsResponse);

            commit('message/setType', 'success', { root: true });
            commit('message/setMessage', 'Image of the day loaded.', { root: true })
            commit('message/setHttpCode', 200, { root: true })
            commit('message/setLoading', false, { root: true });
        } catch (error) {
            commit('message/setType', 'error', { root: true });
            commit('message/setMessage', error.message, { root: true })
            commit('message/setHttpCode', error.code, { root: true })
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