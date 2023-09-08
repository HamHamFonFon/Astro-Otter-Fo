import { ConstellationWs } from '@/repositories/api/constellations';

const initialState = () => {
    return {
        constellations: [],
        totalCount: 0,
        offset: 0,
        filterCriteria: null
    }
};

const state = initialState;

const actions = {
    async fetchListConstellations({commit}) {
        try {
            commit('resetState');
            commit('message/setLoading', true, { root: true });
            commit('message/setType', 'warning', { root: true });
            commit('message/setMessage', 'Loading constellations list...', { root: true })
            commit('message/setHttpCode', null, { root: true })

            const constellationsResponse = await ConstellationWs.GET_CONSTELLATION_LIST();
            constellationsResponse.forEach(constellation => commit("addConstellation", constellation));
            commit('setTotalCount', constellationsResponse.length);

            commit('message/setType', 'success', { root: true });
            commit('message/setMessage', 'Constellations data loaded', { root: true })
            commit('message/setHttpCode', 200, { root: true })
            commit('message/setLoading', false, { root: true });
        } catch (error) {
            commit('message/setType', 'error', { root: true });
            commit('message/setMessage', error.message, { root: true })
            commit('message/setHttpCode', error.code, { root: true })
        }
    },
    async  fetchConstellationById({ commit }, id) {
        commit('resetState');
        commit('message/setLoading', true, { root: true });
        commit('message/setType', 'warning', { root: true });
        commit('message/setMessage', 'Loading constellation data...', { root: true })
        commit('message/setHttpCode', null, { root: true })
        try {
            const constellationResponse = await ConstellationWs.GET_CONSTELLATION_ITEM(id);
            commit('message/setType', 'success', { root: true });
            commit('message/setMessage', 'Constellation "' + constellationResponse.generic + '" loaded', { root: true })
            commit('message/setHttpCode', 200, { root: true })
            commit('updateConstellation', constellationResponse);
            commit('setTotalCount', 1);
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
    setTotalCount: (state, totalCount) => {
        state.totalCount = totalCount;
    },
    addConstellation: (state, constellation) => {
        state.constellations.push(constellation);
    },
    updateConstellation: (state, constellation) => {
      state.constellations = [constellation];
    }
};

const getters = {
    getConstellationById: (state) => (id) => {
        return state.constellations.find(constellation => id === constellation.id);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};