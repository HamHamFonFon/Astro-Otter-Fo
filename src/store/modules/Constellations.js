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
    /*async*/ fetchConstellations({commit}) {
        console.log('fetchConstellation');
        commit('resetState');
        commit('message/setLoading', true, { root: true });
        commit('message/setType', 'warning', { root: true });
        commit('message/setMessage', 'Loading constellations data', { root: true })
        commit('message/setHttpCode', null, { root: true })
        try {
            let constellationMock = [
                {constId: 'uma', title: 'Ursa major'},
                {constId: 'ori', title: 'Orion'},
                {constId: 'aql', title: 'Aquila'}
            ];
            console.log(constellationMock);
            constellationMock.forEach(constellation => commit('addConstellation', constellation))
            commit('setTotalCount', constellationMock.length);

            commit('message/setType', 'success', { root: true });
            commit('message/setMessage', 'Constellations data loaded', { root: true })
            commit('message/setHttpCode', 200, { root: true })
            //commit('message/setLoading', false, { root: true });
        } catch (error) {
            commit('message/setType', 'error', { root: true });
            commit('message/setMessage', error.message, { root: true })
            commit('message/setHttpCode', error.code, { root: true })
            commit('message/setLoading', true, { root: true });
        }
    },
    async fetchConstellationById({ commit }, id) {
        commit('resetState');

        try {
            commit('addConstellation', {constId: id, title: 'Ursa major'});
            commit('setTotalCount', 1);
        } catch (error) {
            console.log(error);
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