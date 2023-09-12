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
            commit('message/setMessage', {
                'loading': true,
                'type': 'warning',
                'message': 'Loading constellations list...',
                'httpCode': null
            }, { root: true });

            const constellationsResponse = await ConstellationWs.GET_CONSTELLATION_LIST();
            constellationsResponse.forEach(constellation => commit("addConstellation", constellation));
            commit('setTotalCount', constellationsResponse.length);

            commit('message/setMessage', {
                'loading': false, // CHANGE IT
                'type': 'success',
                'message': 'Constellations data loaded',
                'httpCode': 200
            }, { root: true });

        } catch (error) {
            commit('message/setMessage', {
                'loading': true, // CHANGE IT
                'type': 'error',
                'message': error.message,
                'httpCode': error.code
            }, { root: true });
        }
    },
    async fetchConstellationById({ commit }, id) {
        commit('resetState');
        commit('message/setMessage', {
            'loading': true,
            'type': 'warning',
            'message': 'Loading constellation data...',
            'httpCode': null
        }, { root: true });

        try {
            const constellationResponse = await ConstellationWs.GET_CONSTELLATION_ITEM(id);
            commit('message/setMessage', {
                'loading': true,
                'type': 'success',
                'message': 'Constellation "' + constellationResponse.generic + '" loaded',
                'httpCode': 200
            }, { root: true });
            commit('updateConstellation', constellationResponse);
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